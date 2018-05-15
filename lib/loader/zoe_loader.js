'use strict'

const fs = require('fs');
const path = require('path');

class ZoeLoader {
	constructor(opts) {
		this.baseDir = opts.baseDir;
	}
	loader(dirPath) {
		const dir = fs.readdirSync(dirPath);
		return dir.map((filename) => {
			const module = require(path.join(dirPath, filename));
      return { name: filename.split('.')[0], module };
		});
	}
	loadController() {
		const url = path.join(this.baseDir, 'controller');
		return this.loader(url);
	}
	loadService() {
		const url = path.join(this.baseDir, 'service');
		return this.loader(url);
	}
	loadConfig() {
		const url = path.join(this.baseDir, 'config');
		return this.loader(url);
	}
}

module.exports = ZoeLoader;