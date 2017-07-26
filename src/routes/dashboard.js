module.exports = async (ctx) => {
	if (!ctx.session.username) {
		ctx.redirect('/login');
	} else {
		await ctx.render('dashboard', {
			username: ctx.session.username,
			csrfToken: ctx.session.csrfToken,
		});
	}
};
