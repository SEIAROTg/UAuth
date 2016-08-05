const co = require('co');

function promisify(func, withoutError = false) {
	return function() {
		return new Promise((resolve, reject) => {
			func.apply(this, [...arguments, (err, ...ret) => {
				if (withoutError) {
					resolve(err, ...ret);
				} else if (err) {
					reject(err);
				} else {
					resolve(...ret);
				}
			}]);
		});
	}
}

function asynchronize(func) {
	let _this = this;
	return function() {
		co(func.bind(_this, ...arguments)).done();
	}
}

Promise.prototype.done = function() {
	this.catch(x => setTimeout(() => console.log(x.stack), 0));
}

module.exports = {
	promisify,
	asynchronize,
}
