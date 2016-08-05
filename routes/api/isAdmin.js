const asynchronize = require('../../common').asynchronize;
const db = require('../../db');

module.exports = asynchronize(function*(req, res, next) {
	if (!req.userId) {
		req.isAdmin = false;
	} else {
		let admin = yield db.query('SELECT * FROM admin WHERE userId = ?', [req.session.userId]);
		req.isAdmin = !!admin.length;
	}
	next();
});
