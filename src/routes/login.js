const assert = require('assert');
const crypto = require('mz/crypto');
const config = require('../config');
const ldap = require('../ldap');
const db = require('../db');
const utils = require('../utils');

module.exports = async (ctx) => {
	const redirectUrl = utils.filterRedirectUrl(ctx.query.redirect);

	if (!ctx.session.wechatId && utils.isWechat(ctx)) {
		ctx.session.wechatState = (await crypto.randomBytes(16)).toString('hex');
		const urlGetCode =
			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wechat.appid}` +
			`&redirect_uri=${encodeURIComponent(ctx.origin + '/wechat')}` +
			`&response_type=code&scope=snsapi_base&state=${ctx.session.wechatState}#wechat_redirect`;
		ctx.redirect(urlGetCode)
		return;
	}

	let message;
	try {
		if (!ctx.session.username && ctx.method === 'POST') {
			assert(ctx.session.csrfToken === ctx.request.body.csrf, 'Page Timeout');

			const username = ctx.request.body.username;
			const password = ctx.request.body.password;

			assert(username, 'Invalid Username');
			assert(password, 'Invalid Password');

			const correct = await ldap.verifyPassword(username, password);
			assert(correct, 'Invalid Credentials');

			ctx.session.username = username;
			if (ctx.session.wechatId) {
				await db.wechat.set(ctx.session.wechatId, username);
			}
		}
	} catch (e) {
		ctx.status = e instanceof assert.AssertionError ? 400 : 500;
		const expose = e instanceof assert.AssertionError || ctx.app.env === 'development';
		message = expose ? e.message : 'Internal Error';
	}

	if (ctx.session.username) {
		ctx.redirect(redirectUrl);
	} else {
		await ctx.render('login', {
			message,
			csrfToken: ctx.session.csrfToken,
		});
	}
};
