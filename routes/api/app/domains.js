const co = require('co');
const assert = require('chai').assert;

const promisify = require('../../../common').promisify;
const db = require('../../../db');

const forbiddenStatus = [
	'pending',
	'deleted',
];

module.exports = co.wrap(function*(req, res) {

	try {
		assert.isArray(req.body.domains, 'invalid domains');
		assert.isAtMost(req.body.domains.length, 3, 'invalid number of domains');
		for (let domain of domains) {
			assert.isString(domain);
			assert.match(domain, /^(?:https?:\/\/[a-z0-9]+(?:\.[a-z0-9]+)+(?::\d+)?(?:\/)?)?$/);
		}
	} catch (e) {
		res.status(400).json({
			code: 400,
			message: e.message,
		});
		return;
	}

	let app = yield db.query('SELECT status, ownerUser FROM app WHERE id=? LIMIT 1', [req.params.id]);

	if (!app.length) {
		res.status(404).json({
			code: 404,
			message: 'app not found',
		});
	} else if (req.session.userId !== app[0].ownerUser) {
		res.status(403).json({
			code: 403,
			message: 'access denied',
		});
	} else if (forbiddenStauts.includes(app[0].status)) {
		res.status(400).json({
			code: 400,
			message: 'cannot modify app in this status',
		});
	} else {
		try {
			yield db.query('UPDATE app SET domains=:domains WHERE id=:id LIMIT 1', {
				domains: req.body.domains.join('|'),
				id: req.params.id,
			});
			res.status(200).json({
				code: 0,
			});
		} catch (e) {
			res.status(500).json({
				code: 500,
				message: e.message,
			});
		}
	}
});
