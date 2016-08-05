module.exports = (req, res) => {
	res.status(200).json({
		code: 0,
		data: {
			id: req.session.userId,
			name: req.session.userName,
			isAdmin: req.isAdmin,
		}
	});
}
