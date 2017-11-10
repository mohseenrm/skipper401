const { expect } = require('chai');
const { calculateContribution } = require('../../src/phases/phaseOne');

describe('Phase One', () => {
	it('Calcluate Employee Contribution', () => {
		const cases = [
			['100', '10'],
			[500, '5'],
			['1000', 2],
			['', 3],
			[500, ''],
		];
		
		const results = [
			10,
			25,
			20,
			0,
			0,
		];
		
		cases.map((item, index) => {
			expect(calculateContribution(item[0], item[1])).to.equal(results[index]);
		});
	});
});
