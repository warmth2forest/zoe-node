'use strict'

const fs = require('fs');
const path = require('path');
const helper = require('./helper.js');

class Logger {
	constructor(app) {
		this.app = app;
	}
	error(app, log) {
		const errorLogPath = app.errorLogPath || path.join(process.cwd(), 'log');
		const errorLogName = app.errorLogName || `${helper.parseDate(+new Date())}.log`;

		!fs.existsSync(errorLogPath) && fs.mkdirSync(errorLogPath);
		fs.readFile(path.join(errorLogPath, errorLogName), (err, data) => {
			const ws = fs.createWriteStream(path.join(errorLogPath, errorLogName));
			const content = data ? `${data}\n${log}` : `${log}`;
			ws.write(content);
		});
	}
}

module.exports = new Logger();