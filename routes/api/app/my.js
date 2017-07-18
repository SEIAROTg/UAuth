const asynchronize = require('../../../common').asynchronize;
const db = require('../../../db');

function transformApp(row) {
	return {
		id: row.id,
		name: row.name,
		description: row.description,
		ownerType: row.ownerType,
		status: row.status,
	};
}

module.exports = asynchronize(function*(req, res) {

	let apps = yield db.query('SELECT id, name, description, ownerType, status FROM app WHERE ownerUser=? AND status<>"deleted"', [req.session.userId]);

	res.status(200).json({
		code: 0,
		data: apps.map(transformApp),
	});

});
