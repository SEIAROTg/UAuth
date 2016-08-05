const co = require('co');

module.exports = co.wrap(function*(username, password) {
	// TODO: perform login
	return {
		id: '6500000',
		name: 'John Doe',
	};
});
