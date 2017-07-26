const assert = require('assert');
const db = require('../db');
const ldap = require('../ldap');
const config = require('../config');

module.exports = async (ctx) => {
	try {
		const appid = ctx.query.appid;
		const appsecret = ctx.query.appsecret;
		const code = ctx.query.code;
		const appConfig = config.apps[appid];
		assert(appid && appConfig, 'Invalid Argument: appid');
		assert(appsecret && appConfig.appsecret === appsecret, 'Invalid Argument: appsecret');
		assert(code, 'Invalid Argument: code');
		const data = JSON.parse(await db.code.get(code));
		assert(data, 'Invalid Argument: code');
		// code is not valid for current appid
		assert(data.appid === appid, 'Invalid Argument: code');

		ctx.body = data.userInfo;
		await db.code.del(code);
	} catch (e) {
		const status = e instanceof assert.AssertionError ? 400 : 500;
		const expose = e instanceof assert.AssertionError || ctx.app.env === 'development';
		const message = expose ? e.message : 'Internal Error';
		ctx.status = status;
		ctx.body = { code: status, message };
	}
};
