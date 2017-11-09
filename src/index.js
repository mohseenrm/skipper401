const path = require('path');

const {
	phaseOne,
	phaseTwo,
	phaseThree,
} = require('./phases');

const runner = () => {
	phaseOne();
	phaseTwo();
	phaseThree();
};

runner();