const assert = require('assert');
const request = require('request-promise-native');
const config = require('../config');
const utils = require('../utils');
const db = require('../db');

const URL_GET_OPENID = 'https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code';

module.exports = async (ctx) => {
	assert(ctx.query.code, 'Invalid Argument: code');
	assert(ctx.query.state === ctx.session.wechatState, 'Invalid Argument: state');
	const redirectUrl = utils.filterRedirectUrl(ctx.query.redirect);

	const urlGetOpenid =
		`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wechat.appid}` +
		`&secret=${config.wechat.appsecret}` +
		`&code=${encodeURIComponent(ctx.query.code)}&grant_type=authorization_code`;

	const body = await request.get(urlGetOpenid, { json: true, timeout: 5000 });
	assert(!body.errcode, 'Invalid Argument: code');
	ctx.session.wechatId = body.openid;

	const username = await db.wechat.get(ctx.session.wechatId);
	if (username) {
		ctx.session.username = username;
	}

	ctx.redirect(redirectUrl);
};
