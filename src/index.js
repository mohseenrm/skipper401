const path = require('path');
const sequence = require('promise-sequence');

const {
	phaseOne,
	phaseTwo,
	phaseThree,
} = require('./phases');

const runner = () => {
	// sequencing promises from each phase
	return Promise.resolve(phaseOne())
		.then(data => phaseTwo(data))
		.then(data => phaseThree(data))
		.catch(err => console.log(err));
};

runner();