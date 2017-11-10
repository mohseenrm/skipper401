const { expect } = require('chai');

const Portfolio = require('../../src/Portfolio');

describe('Portfolio', () => {
	it('Type', () => {
		const testPortfolio = new Portfolio(
			'John',
			'Bonham',
			'2',
			500,
			500
		);

		expect(testPortfolio).to.be.an.instanceof(Portfolio);
	});

	it('Contibution', () => {
		const testPortfolio = new Portfolio(
			'John',
			'Bonham',
			'2',
			500,
			500
		);

		expect(testPortfolio.contribution).to.equal(1000);
	});

	it('Portfolio Creation', () => {
		const testPortfolio = new Portfolio(
			'John',
			'Bonham',
			'2',
			500,
			500
		);

		const symbolData = { VFIAX: 10.42, VTSAX: 20.21, VGSLX: 1.19, VTIAX: 2.21 };
		const portfolioData = [ 
			{ symbol: 'VTSAX', pct: 50 },
			{ symbol: 'VGSLX', pct: 30 },
			{ symbol: 'VFIAX', pct: 20 },
		];

		const generatedPortfolio = testPortfolio.calculatePortfolio(
			symbolData,
			portfolioData
		).retrieve.portfolio;

		expect(
			generatedPortfolio.assets.length
		).to.not.equal(0);

		expect(
			generatedPortfolio.value
		).to.not.equal(0);

		expect(
			generatedPortfolio.available
		).to.not.equal(testPortfolio.contribution);
	});
});