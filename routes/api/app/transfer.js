const asynchronize = require('../../../common').asynchronize;
const db = require('../../../db');

const forbiddenStatus = [
	'pending',
	'deleted',
];

module.exports = asynchronize(function*(req, res) {

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
			message: 'cannot transfer app in this status',
		});
	} else {
		try {
			// TODO: check new owner
			yield db.query('UPDATE app SET ownerUser=:ownerUser WHERE id=:id LIMIT 1', {
				ownerUser: req.body.newOwner,
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
