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

module.exports = () => {
	console.log('phase one');

	// reading payroll and census file
	const promises = [];

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
		console.log(filteredData);
	});
};
