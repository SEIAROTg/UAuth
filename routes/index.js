"use strict";

const express = require('express');
const router = express.Router();

const oauth = require('./oauth');
const api = require('./api');

const login = require('./login');

router.use('/oauth', oauth);
router.use('/api', api);

router.all('/', login, (req, res) => {
	if (req.method !== 'GET') {
		res.redirect('/');
	} else {
		res.render('userpanel');
	}
});

module.exports = router;
