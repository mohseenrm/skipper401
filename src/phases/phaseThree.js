const _ = require('underscore');
const path = require('path');

const { parseCsv } = require('../utils');
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

const filterSymbolData = parsedData => {
	let symbolData = {};
	parsedData.map(record => {
		symbolData[record.symbol] = parseFloat(record.price);
	});
	return symbolData;
};
/* Simple util to generate risk object */
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
	// sort on object key percentage
	Object.keys(data).map(key => {
		sortedRiskData[key] = _.sortBy(data[key], 'pct').reverse();
	});
	return sortedRiskData;
};
/* Phase Three Script, data is being piped from previous phases */
module.exports = (data) => {
	console.log('phase three');
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

		const filteredSymbolData = filterSymbolData(symbolData);
		const filteredRiskData = filterRiskData(riskData);

		console.log(filteredSymbolData);

		const sortedRiskData = sortRiskData(filteredRiskData);
		console.log(sortedRiskData);
	});
};
