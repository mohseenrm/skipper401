const _ = require('underscore');
const path = require('path');

const { parseCsv } = require('../utils');
const Portfolio = require('../Portfolio');

/* File paths, better way would be config file with directory data */
const symbolPricePath = path.join(
	__dirname,
	'..',
	'..',
	'data',
	'symbol_price.csv'
);

const riskSymbolPath = path.join(
	__dirname,
	'..',
	'..',
	'data',
	'risk_symbol.csv'
);

/* Organize and filter symbol data */
const filterSymbolData = parsedData => {
	let symbolData = {};

	parsedData.map(record => {
		symbolData[record.symbol] = parseFloat(record.price);
	});

	return symbolData;
};

/* Util to generate risk object */
const generateRiskObject = (symbol, pct) => ({
	symbol,
	pct: parseFloat(pct),
});

/* Organize and filter parsed data */
const filterRiskData = parsedData => {
	let riskData = {};

	parsedData.map(record => {
		if (riskData[record.risk]) {
			riskData[record.risk].push(
				generateRiskObject(record.symbol, record.pct)
			);
		} else {
			riskData[record.risk] = [
				generateRiskObject(record.symbol, record.pct)
			];
		}
	});

	return riskData;
};

/* Sorting data with highest weights first */
const sortRiskData = data => {
	let sortedRiskData = {};

	/* 
		sort on object key percentage, the library does not have a descending attribute :( 
	*/
	Object.keys(data).map(key => {
		sortedRiskData[key] = _.sortBy(data[key], 'pct').reverse();
	});

	return sortedRiskData;
};

const printPhaseThreeResults = phaseThreeResults => {
	let output = '';

	console.log('== Phase Three Results =======================================');
	phaseThreeResults.map(result => {
		output += result.portfolio.pretty;
	});

	console.log(output);
};

/* Phase Three Script, data is being piped from previous phases */
module.exports = (data) => {
	let promises = [];

	promises.push(
		parseCsv(symbolPricePath)
			.catch(err => console.log(err))
	);
	promises.push(
		parseCsv(riskSymbolPath)
			.catch(err => console.log(err))
	);

	return Promise.all(promises).then(parsedData => {
		const [ symbolData, riskData ] = parsedData;

		/* Filter, Sort and Organize data for calculating portfolio */
		const filteredRiskData = filterRiskData(riskData);
		const filteredSymbolData = filterSymbolData(symbolData);
		const sortedRiskData = sortRiskData(filteredRiskData);

		const portfolioData = data.map(record => {
			return Object.assign(
				{},
				record,
				{ 
					portfolio: new Portfolio(
						record.first_name,
						record.last_name,
						record.risk_setting,
						record.employee_contribution,
						record.employer_contribution
					)
				}
			);
		});
		
		const phaseThreeResults = portfolioData.map(record => {
			return Object.assign(
				{},
				record,
				{
					portfolio: record.portfolio.calculatePortfolio(
						filteredSymbolData,
						sortedRiskData[record.risk_setting]
					).retrieve
				}
			);
		});

		printPhaseThreeResults(phaseThreeResults);
	});
};
