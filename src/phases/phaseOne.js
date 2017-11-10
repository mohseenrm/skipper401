const fse = require('fs-extra')
const parse = require('csv-parse');
const path = require('path');

const { parseCsv } = require('../utils');

const payrollPath = path.join(
	__dirname,
	'..',
	'..',
	'data',
	'payroll_631fa526.csv',
);

const censusPath = path.join(
	__dirname,
	'..',
	'..',
	'data',
	'census_1498456690.csv',
);

const filterParsedData = parsedData => {
	const [ payrollData, censusData ] = parsedData;
	let filteredData = [];

	for (let person in censusData){
		// if salary data is available
		if (censusData[person].salary !== ''){
			filteredData.push({
				contribution_rate_pct: censusData[person].contribution_rate_pct,
				first_name: censusData[person].first_name,
				last_name: censusData[person].last_name,
				match_rate_pct: censusData[person].match_rate_pct,
				risk_setting: censusData[person].risk_setting,
				salary: censusData[person].salary,
			});
		} else {
			// search for record in payroll
			const searchRecords = payrollData.filter(
				record => (
					record.first_name === censusData[person].first_name &&
					record.second_name === censusData[person].second_name
				)
			);

			// add to result
			filteredData.push({
				contribution_rate_pct: censusData[person].contribution_rate_pct,
				first_name: censusData[person].first_name,
				last_name: censusData[person].last_name,
				match_rate_pct: censusData[person].match_rate_pct,
				risk_setting: censusData[person].risk_setting,
				gross: searchRecords[0].gross || null,
			});
		}
	}

	return filteredData;
};

const calculateContribution = (biWeeklyPay, percentage) => (biWeeklyPay * percentage) / 100; 

const printPhaseOneResults = phaseOneResults => {
	console.log('== Phase One Results =======================================\n');
	phaseOneResults.map(result => {
		console.log(`${result.last_name}, ${result.first_name} | employee contribution: $${result.employee_contribution}`);
	});
	console.log('');
};

module.exports = () => {
	// reading payroll and census file
	const promises = [];
	/* 
		Using Async file reads to queue on JS event loop, sync ops take longer, better way would be to use file streaming
	*/
	promises.push(
		parseCsv(payrollPath)
			.catch(err => console.log(err))
	);

	promises.push(
		parseCsv(censusPath)
			.catch(err => console.log(err))
	);

	// recieve parsed data
	return Promise.all(promises).then(parsedData => {
		const filteredData = filterParsedData(parsedData);

		const results = filteredData.map((data) => {
			// average of 26.0745 bi weekly pay periods in a year
			// assuming annual salary
			// adding new data to filteredData
			if (data.salary) {
				return Object.assign(
					{},
					data,
					{
						bi_weekly_pay: (parseFloat(data.salary) / parseFloat(26.0745)),
						employee_contribution: calculateContribution(
							(parseFloat(data.salary) / parseFloat(26.0745)),
							parseFloat(data.contribution_rate_pct)
						)
					},
				);
			} else {
				return Object.assign(
						{},
						data,
						{
							bi_weekly_pay: parseFloat(data.gross),
							employee_contribution: calculateContribution(
								parseFloat(data.gross),
								parseFloat(data.contribution_rate_pct)
							) 
						},
					);
			}
		});

		printPhaseOneResults(results);
		return results;
	});
};
