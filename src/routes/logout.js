const db = require('../db');
const utils = require('../utils');

module.exports = async (ctx) => {
	if (ctx.session.csrfToken === ctx.request.body.csrf) {
		delete ctx.session.username;
		if (ctx.session.wechatId && utils.isWechat(ctx)) {
			await db.wechat.del(ctx.session.wechatId);
		}
	}
	ctx.redirect('/login');
};
