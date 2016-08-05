"use strict";

const asynchronize = require('../common').asynchronize;

const authentication = require('./authentication');

module.exports = asynchronize(function*(req, res, next) {
	if (req.method === 'POST' && req.body.isLogout !== undefined) {
		req.session.userId = undefined;
		res.render('login', {
			prompt: '',
		});
	} else if (req.method === 'POST' && req.body.isLogin !== undefined) {
		let userInfo = yield authentication(req.body.username, req.body.password);
		if (userInfo) {
			req.session.userId = userInfo.id;
			req.session.userName = userInfo.name;
			next();
		} else {
			res.render('login', {
				prompt: 'Incorrect username or password',
			})
		}
	} else if (req.session.userId) {
		next();
	} else {
		res.render('login', {
			prompt: '',
		});
	}
});
