/* 
	Portfolio class for definig behaviour of portfolio, given asset allocation and symbol prices 
*/
module.exports = class Portfolio {
	constructor(
		first_name,
		last_name,
		risk_setting,
		employee_contribution = 0,
		employer_contribution = 0,
	) {
		// metadata
		this.first_name = first_name;
		this.last_name = last_name;
		// determines allocation of symbols using risk
		this._risk_setting = risk_setting;
		// total contribution towards fund
		this._contribution = employee_contribution + employer_contribution;
		// internal portfolio structure
		this._portfolio = {
			assets: [],
			available: this._contribution,
			value: 0,
		};
	}

	get name() {
		return `${this.last_name}, ${this.first_name}`;
	}
	
	/* Requires symbols to purchase and allocation of symbols in portfolio */
	calculatePortfolio(symbols, allocation) {
		allocation.map(item => {
			const percentage = parseFloat(item.pct) / 100;
			const funds = this._contribution * percentage;

			const { symbol } = item;
			// check quantity
			const quantity = Math.floor(funds / symbols[symbol]);
			const price = quantity * symbols[symbol];
			// if purchasing power > 0, purchase symbols
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
		// added this fella for chaining of operations
		return this;
	}

	get retrieve() {
		return this;
	}

	/* Print portfolio */
	get pretty() {
		let index = 1;
		let output = `\n${this.name} | Portfolio\n`;
		
		output += 'No | Symbol | Quantity | Price | Percentage\n';

		if(this._portfolio.assets.length > 0) {
			this._portfolio.assets.map(asset => {
				output += `${index++} | ${asset.symbol} | ${asset.quantity} | $${asset.price} | ${parseFloat((asset.price / this._contribution) * 100).toFixed(2)}\n`;
			});
		}

		output += `Total Value: $${this._portfolio.value} | Total funds available: $${this._portfolio.available}\n`;

		return output;
	}
};
