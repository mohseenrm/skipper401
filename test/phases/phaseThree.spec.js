const { expect } = require('chai');
const { sortRiskData } = require('../../src/phases/phaseThree');

describe('Phase Three', () => {
	it('Sort Risk Data', () => {
		const testCases = { 
			'1': [ 
				{ symbol: 'VFIAX', pct: 30 },
				{ symbol: 'VTSAX', pct: 30 },
				{ symbol: 'VGSLX', pct: 40 },
			],
			'2': [ 
				{ symbol: 'VFIAX', pct: 20 },
				{ symbol: 'VTSAX', pct: 50 },
				{ symbol: 'VGSLX', pct: 30 },
			],
			'3': [ 
				{ symbol: 'VFIAX', pct: 10 },
				{ symbol: 'VTSAX', pct: 10 },
				{ symbol: 'VGSLX', pct: 50 },
				{ symbol: 'VTIAX', pct: 30 },
			],
			'4': [ 
				{ symbol: 'VFIAX', pct: 5 },
				{ symbol: 'VTSAX', pct: 5 },
				{ symbol: 'VGSLX', pct: 70 },
				{ symbol: 'VTIAX', pct: 10 },
				{ symbol: 'VFIAX', pct: 7 },
				{ symbol: 'VTSAX', pct: 3 },
			]
		};

		const expectedResults = { 
			'1': [
				{ symbol: 'VGSLX', pct: 40 },
				{ symbol: 'VTSAX', pct: 30 },
				{ symbol: 'VFIAX', pct: 30 },
			],
			'2': [
				{ symbol: 'VTSAX', pct: 50 },
				{ symbol: 'VGSLX', pct: 30 }, 
				{ symbol: 'VFIAX', pct: 20 },
			],
			'3': [ 
				{ symbol: 'VGSLX', pct: 50 },
				{ symbol: 'VTIAX', pct: 30 },
				{ symbol: 'VTSAX', pct: 10 },
				{ symbol: 'VFIAX', pct: 10 },
			],
			'4': [
				{ symbol: 'VGSLX', pct: 70 },
				{ symbol: 'VTIAX', pct: 10 },
				{ symbol: 'VFIAX', pct: 7 },
				{ symbol: 'VTSAX', pct: 5 },
				{ symbol: 'VFIAX', pct: 5 },
				{ symbol: 'VTSAX', pct: 3 },
			]
		};

		const results = sortRiskData(testCases);

		expect(results).to.deep.equal(expectedResults);
	});
});
