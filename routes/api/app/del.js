const asynchronize = require('../../../common').asynchronize;
const db = require('../../../db');

module.exports = asynchronize(function*(req, res) {

	let app = yield db.query('SELECT ownerUser FROM app WHERE id=? LIMIT 1', [req.params.id]);

	if (!app.length) {
		res.status(404).json({
			code: 404,
			message: 'app not found',
		});
	} else if (!req.isAdmin && req.session.userId !== app[0].ownerUser) {
		res.status(403).json({
			code: 403,
			message: 'access denied',
		});
	} else {
		try {
			yield db.query('UPDATE app SET status="deleted" WHERE id=? LIMIT 1', [req.params.id]);
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
