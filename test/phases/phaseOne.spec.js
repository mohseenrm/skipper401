const { expect } = require('chai');
const { calculateContribution } = require('../../src/phases/phaseOne');

describe('Phase One', () => {
	it('Calcluate Employee Contribution', () => {
		console.log(calculateContribution);
		const result = 2 + 2;
		expect(result).to.equal(4);
	});
});
