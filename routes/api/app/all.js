const co = require('co');

const db = require('../../../db');

function transformApp(row) {
	return {
		id: row.appid,
		name: row.name,
		description: row.description,
		ownerType: row.ownerType,
		status: row.status,
	};
}

module.exports = co.wrap(function*(req, res) {

	if (!req.isAdmin) {
		res.status(403).json({
			code: 403,
			message: 'access denied',
		});
	} else {
		let apps = yield db.query('SELECT appid, name, description, ownerType, status FROM app');

		res.status(200).json({
			code: 0,
			data: apps.map(transformApp),
		});
	}

});
