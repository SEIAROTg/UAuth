"use strict";

const express = require('express');
const router = express.Router();

const oauth = require('./oauth');
const api = require('./api');

const login = require('./login');

router.use('/oauth', oauth);

router.all('/', login, (req, res) => {
	if (req.method !== 'GET') {
		res.redirect('/');
	} else {
		res.render('userpanel');
	}
});

router.use((req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		res.status(401).json({
			code: '401',
			message: 'not logged in',
		})
	}
});

router.use('/api', api);

module.exports = router;
