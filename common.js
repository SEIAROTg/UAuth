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

Promise.prototype.done = function() {
	this.catch(x => setTimeout(() => console.log(x.stack), 0));
}

module.exports = {
	promisify,
}
