const { expect } = require('chai');
const { calculateEmployerMatch } = require('../../src/phases/phaseTwo');

describe('Phase Two', () => {
	it('Calculate Employer Contibution', () => {
		const testCases = [
			{
				match_rate_pct: '1',
				bi_weekly_pay: 2000,
			},
			{
				match_rate_pct: '5',
				bi_weekly_pay: 5000,
			},
			{
				match_rate_pct: 2,
				bi_weekly_pay: '',
			},
			{
				match_rate_pct: '',
				bi_weekly_pay: 4500,
			}
		];

		const expectedResults = [
			20,
			250,
			0,
			0
		];

		const results = calculateEmployerMatch(testCases);

		results.map((record, index) => {
			expect(record.employer_contribution).to.equal(expectedResults[index]);
		});
	});
});
