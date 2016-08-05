const co = require('co');

const db = require('../../db');

module.exports = co.wrap(function*(req, res, next) {
	if (!req.userId) {
		req.isAdmin = false;
	} else {
		let admin = yield db.query('SELECT * FROM admin WHERE userId = ?', [req.session.userId]);
		req.isAdmin = !!admin.length;
	}
	next();
});
