const crypto = require('crypto');
const assert = require('chai').assert;

const {promisify, asynchronize} = require('../../../common');
const db = require('../../../db');

const ownerTypes = ['individual', 'org', 'university'];
const scopes = ['id', 'basic', 'email', 'year', 'major', 'dept', 'class'];

module.exports = asynchronize(function*(req, res) {
	try {
		assert.isString(req.body.name, 'invalid name');
		assert.isAtLeast(req.body.name.length, 5, 'name too short');
		assert.isAtMost(req.body.name.length, 50, 'name too long');
		assert.isString(req.body.description, 'invalid description');
		assert.isAtMost(req.body.description.length, 100, 'description too long');
		assert.oneOf(req.body.ownerType, ['individual', 'org', 'university'], 'invalid owner type');
		assert.isString(req.body.ownerName, 'invalid organization / department');
		assert.isAtMost(req.body.ownerName.length, 50, 'organization / department too long');
		assert.isString(req.body.scope, 'invalid scope');
		assert.isAbove(req.body.scope.length, 0, 'empty scope');
		for (let scope of req.body.scope.split('+')) {
			assert.oneOf(scope, scopes, 'invalid scope');
		}
		assert.isString(req.body.reason, 'invalid reason');
		assert.isAtMost(req.body.reason.length, 2000, 'reason too long');
	} catch (e) {
		res.status(400).json({
			code: 400,
			message: e.message,
		});
	}

	try {
		let appid = 'ua' + (yield promisify(crypto.randomBytes)(8)).toString('hex');

		yield db.query(
	'INSERT INTO app (\
	appid, name, ownerType, ownerName, ownerUser, description, status, scope, reason, domains\
	) VALUES (\
	:appid, :name, :ownerType, :ownerName, :ownerUser, :description, "pending", :scope, :reason, ""\
	)', {
			appid,
			name: req.body.name,
			ownerType: req.body.ownerType,
			ownerName: req.body.ownerName,
			ownerUser: req.session.userId,
			description: req.body.description,
			scope: req.body.scope,
			reason: req.body.reason,
		});

		res.status(201).json({
			code: 0,
			data: {
				appid,
			}
		});
	} catch (e) {
		res.status(400).json({
			code: 500,
			message: e.message,
		})
	}
});
