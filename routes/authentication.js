const asynchronize = require('../common').asynchronize;

module.exports = asynchronize(function*(username, password) {
	// TODO: perform login
	return {
		id: '6500000',
		name: 'John Doe',
	};
});
