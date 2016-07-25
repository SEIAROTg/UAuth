const express = require('express');
const router = express.Router();
const assert = require('chai').assert;

router.get('/authorize', (req, res) => {
	assert.strictEqual(req.query.response_type, 'code', 'response_type must be `code`');
	assert.lengthOf(req.query.appid, 18, 'invalid appid');
	assert.oneOf(req.query.scope, [], 'invalid scope');
});

router.get('/userinfo', (req, res) => {
	assert.strictEqual(req.query.grant_type, 'authorization_code', 'grant_type must be `authorization_code`');
	assert.lengthOf(req.query.appid, 18, 'invalid appid');
	assert.lengthOf(req.query.appsecret, 32, 'invalid appsecret');
});

module.exports = router;
