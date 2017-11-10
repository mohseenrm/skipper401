/* Compute employer contribution */
const calculateEmployerMatch = dataset => {
	return dataset.map(data => {
		const matchPercentage = (parseFloat(data.match_rate_pct) || 0) / 100;
		return Object.assign(
			{},
			data,
			{ employer_contribution: (parseFloat(data.bi_weekly_pay) || 0) * matchPercentage },
		);
	});
};

const printPhaseTwoResults = data => {
	let total = 0;
	console.log('== Phase Two Results =======================================\n');
	data.map(result => {
		console.log(`${result.last_name}, ${result.first_name} | employer contribution: $${result.employer_contribution}`);
		total += result.employer_contribution;
	});
	console.log(`Total contribution by employer: $${total}`);
	console.log('');
};

/* Main Phase 2 Script, recieve data from previous phase */
const phaseTwo = (data) => {
	const phaseTwoResults = calculateEmployerMatch(data);
	printPhaseTwoResults(phaseTwoResults);
	return phaseTwoResults;
};

module.exports = {
	calculateEmployerMatch,
	phaseTwo,
};
