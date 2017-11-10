module.exports = (data) => {
	const phaseTwoResults = calculateEmployerMatch(data);
	printPhaseTwoResults(phaseTwoResults);
};

const calculateEmployerMatch = dataset => {
	return dataset.map(data => {
		const matchPercentage = parseFloat(data.match_rate_pct) / 100;
		return Object.assign(
			{},
			data,
			{ employer_contribution: data.bi_weekly_pay * matchPercentage },
		);
	});
};

const printPhaseTwoResults = data => {
	console.log('== Phase Two Results =======================================');
	data.map(result => {
		console.log(`${result.last_name}, ${result.first_name} | employer contribution: $${result.employer_contribution}`);
	});
	console.log('');
};
