"use strict";

module.exports = (req, res, next) => {
	if (req.body.isLogin !== undefined) {
		// TODO: preform login
		req.session.userId = 6500001;
	}
	if (req.session.userId) {
		next();
	} else {
		res.render('login');
	}
};
