const crypto = require('crypto');

const {asynchronize, promisify} = require('../../../common');
const db = require('../../../db');

module.exports = asynchronize(function*(req, res) {
	if (!req.isAdmin) {
		res.status(403).json({
			code: 403,
			message: 'access denied',
		});
	} else {
		let app = yield db.query('SELECT status FROM app WHERE id=? LIMIT 1', [req.params.id]);
		if (!app.length) {
			res.status(404).json({
				code: 404,
				message: 'app not found',
			});
		} else if (app[0].status !== 'pending') {
			res.status(400).json({
				code: 400,
				message: 'cannot approve app in this status',
			});
		} else {
			try {
				let appsecret = (yield promisify(crypto.randomBytes)(20)).toString('hex');

				yield db.query('UPDATE app SET status="enabled", appsecret=:appsecret WHERE id=:id LIMIT 1', {
					appsecret,
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
	}
});
