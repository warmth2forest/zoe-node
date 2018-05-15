module.exports = {
	async resouceInfo(ctx) {
		let err = new Error('www');
		
		err.statusCode = 403;
		err.description = '没权限';
		err.message = '没权限';

		throw err;
		//return 1;
	},
	async resouceInfo1(ctx) {
		for(let i = 0; i < 100000000000; i++);
		return 1;
	},
	async resouceInfo2(ctx) {
		return 2;
	}
};