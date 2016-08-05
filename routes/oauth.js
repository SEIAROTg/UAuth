"use strict";

const express = require('express');
const router = express.Router();
const assert = require('chai').assert;

const login = require('./login');

const scopes = [
	'id',			// user id & role
	'basic',		// Chinese name & English name & gender
	'email',
	'year',			// entrance year & year
	'major',
	'dept',			// faculty & department
	'class',
];

router.all('/authorize', login, (req, res) => {
	assert.strictEqual(req.query.response_type, 'code', 'response_type must be `code`');
	assert.isString(req.query.appid, 'invalid appid');
	assert.lengthOf(req.query.appid.length, 18, 'invalid appid');
	assert(req.query.scope && !req.query.scope.split('+').map(x => scopes.includes(x)).includes(false), 'invalid scope');

	res.render('confirm');
});

router.get('/userinfo', (req, res) => {
	assert.strictEqual(req.query.grant_type, 'authorization_code', 'grant_type must be `authorization_code`');
	assert.isString(req.query.appid, 'invalid appid');
	assert.lengthOf(req.query.appid.length, 18, 'invalid appid');
	assert.isString(req.query.appsecret, 'invalid appsecret');
	assert.lengthOf(req.query.appsecret.length, 40, 'invalid appsecret');
});

module.exports = router;
