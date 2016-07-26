"use strict";

module.exports = (req, res, next) => {
	console.log(req.session);
	if (req.body.isLogin !== undefined) {
		// TODO: preform login
		req.session.userId = 6500001;
		console.log(req.session);
	}
	if (req.session.userId) {
		next();
	} else {
		res.render('login');
	}
};
