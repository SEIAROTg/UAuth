"use strict";

const express = require('express');
const router = express.Router();
const assert = require('chai').assert;

const isAdmin = require('./isAdmin');

const myinfo = require('./myinfo');
const app = require('./app');
const loginLog = require('./loginLog');

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

router.get('/myinfo', isAdmin, myinfo);

router.use('/app', app);

router.get('/loginLog', loginLog);

module.exports = router;
