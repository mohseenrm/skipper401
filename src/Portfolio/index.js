module.exports = class Portfolio {
	constructor(
		first_name,
		last_name,
		risk_setting,
		employee_contribution = 0,
		employer_contribution = 0,
	) {
		this.first_name = first_name;
		this.last_name = last_name;
		this._risk_setting = risk_setting;
		this._contribution = employee_contribution + employer_contribution;
		this._portfolio = {
			assets: [],
			available: this._contribution,
			value: 0,
		};
	}

	get contribution() {
		return this._contribution;
	}

	get name() {
		return `${this.last_name}, ${this.first_name}`;
	}
	// { VFIAX: 10.42, VTSAX: 20.21, VGSLX: 1.19, VTIAX: 2.21 }
	/* [ { symbol: 'VGSLX', pct: 40 },
	{ symbol: 'VTSAX', pct: 30 },
	{ symbol: 'VFIAX', pct: 30 } ] */
	calculatePortfolio(symbols, allocation) {
		allocation.map(item => {
			const percentage = parseFloat(item.pct) / 100;
			const funds = this._contribution * percentage;

			const { symbol } = item;
			// check quantity
			const quantity = Math.floor(funds / symbols[symbol]);
			const price = quantity * symbols[symbol];

			if(quantity > 0 && (this._portfolio.available - price) > 0) {
				this._portfolio.available -= price;
				this._portfolio.value += price;
				this._portfolio.assets.push({
					price,
					quantity,
					symbol,
				});
			}
		});

		return this;
	}

	get retrieve() {
		return this;
	}

	get pretty() {
		let index = 1;
		let output = `\n${this.name} | Portfolio\n`;
		
		output += 'No | Symbol | Quantity | Price | Percentage\n';

		this._portfolio.assets.map(asset => {
			output += `${index++} | ${asset.symbol} | ${asset.quantity} | $${asset.price} | ${parseFloat((asset.price / this._contribution) * 100).toFixed(2)}\n`;
		});

		output += `Total Value: $${this._portfolio.value} | Total funds available: $${this._portfolio.available}\n`;

		return output;
	}
};
