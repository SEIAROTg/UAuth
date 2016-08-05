const asynchronize = require('../../../common').asynchronize;
const db = require('../../../db');

module.exports = asynchronize(function*(req, res) {
	let app = yield db.query('SELECT * FROM app WHERE appid=? LIMIT 1', [req.params.id]);
	if (!app.length) {
		res.status(404).json({
			code: 404,
			message: 'app not found',
		});
	} else {
		if (app[0].ownerUser === req.session.userId) {
			res.status(200).json({
				code: 0,
				data: {
					name: app[0].name,
					ownerType: app[0].ownerType,
					ownerName: app[0].ownerName,
					ownerUserId: app[0].ownerUser,
					ownerUserName: 'John Doe',
					appid: app[0].appid,
					appsecret: app[0].appsecret,
					status: app[0].status,
					scopes: app[0].scope.split('+'),
					reason: app[0].reason,
					domains: app[0].domains.split('|'),
				},
			});
		} else if (req.isAdmin) {
			res.status(200).json({
				code: 0,
				data: {
					name: app[0].name,
					ownerType: app[0].ownerType,
					ownerName: app[0].ownerName,
					ownerUserId: app[0].ownerUser,
					ownerUserName: 'John Doe',
					appid: app[0].appid,
					status: app[0].status,
					scopes: app[0].scope.split('+'),
					reason: app[0].reason,
					domains: app[0].domains.split('|'),
				},
			});
		} else {
			res.status(403).json({
				code: 403,
				message: 'access denied',
			});
		}
	}
});
