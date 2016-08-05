"use strict";

const express = require('express');
const router = express.Router();
const assert = require('chai').assert;

const app = require('./app');
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

router.use('/app', app);

router.get('/loginLog', (req, res) => {

});

module.exports = router;
