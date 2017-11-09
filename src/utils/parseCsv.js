const fse = require('fs-extra');
const parse = require('csv-parse');

module.exports = path => new Promise((resolve, reject) => {
	return fse.readFile(
		path,
		(err, data) => {
			if (err) { console.log('Error reading file: ', path, '\n ', err); }
	
			const stringData = data.toString('utf8');

			parse(
				stringData,
				{
					columns: true,
					trim: true,
				},
				(err, rows) => {
					if(err) { reject(err); }
					resolve(rows);
				}
			);
		}
	);
});
