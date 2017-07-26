const assert = require('assert');
const url = require('url');
const crypto = require('mz/crypto');
const config = require('../config');
const db = require('../db');
const ldap = require('../ldap');

async function generateCode() {
	const random = await crypto.randomBytes(32);
	return random.toString('hex');
}

async function getOpenid(appid, username) {
	const hash = crypto.createHash('sha256');
	hash.update(appid);
	hash.update(config.openid.secret);
	hash.update(username);
	return hash.digest('base64');
}

module.exports = async (ctx) => {
	const appid = ctx.query.appid;
	const responseType = ctx.query.response_type;
	assert(ctx.query.scope, 'Invalid Argument: scope');
	const scopes = ctx.query.scope.split('+');
	const state = ctx.query.state;
	const appConfig = config.apps[appid];
	assert(appid, 'Invalid Argument: appid');
	assert(responseType === 'code', 'Invalid Argument: response_type');
	for (const scope of scopes) {
		assert(appConfig.scopes.includes(scope), 'Invalid Argument: scope');
	}
	assert(appConfig, 'Invalid Argument: appid');
	assert(!state || state.length <= 256, 'Invalid Argument: state');
	const username = ctx.session.username;
	if (!username) {
		ctx.redirect(`/login?redirect=${encodeURIComponent(ctx.url)}`);
		return;
	}

	const userInfo = {};
	const userObj = (await ldap.getUserEntry(username)).object;
	for (const scope of scopes) {
		if (scope === 'openid') {
			userInfo[scope] = await getOpenid(appid, username);
		} else {
			const target = config.ldap.fields[scope];
			userInfo[scope] = userObj[target];
		}
	}

	let code;
	do {
		code = await generateCode();
	} while (await db.code.get(code));

	await db.code.set(code, JSON.stringify({
		appid,
		userInfo,
	}));
	// did not use `setx` / `setex` / `set EX` to be compatiable with both redis and ssdb
	await db.code.expire(code, 60);

	const redirect_uri = new url.URL(appConfig.redirect_uri);
	redirect_uri.searchParams.set('code', code);
	state && redirect_uri.searchParams.set('state', state);
	ctx.redirect(redirect_uri.href);
};
