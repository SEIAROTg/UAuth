module.exports = (req, res) => {
	res.status(200).json({
		id: req.session.userId,
		name: req.session.userName,
		isAdmin: req.isAdmin,
	});
}
