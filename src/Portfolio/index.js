export class Portfolio {
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
	}

	get contribution() {
		return this._contribution;
	}

	get name() {
		return `${this.last_name}, ${this.first_name}`;
	}
};
