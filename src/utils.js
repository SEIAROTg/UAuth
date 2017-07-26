const assert = require('assert');
const url = require('url');

function filterRedirectUrl(redirect) {
	if (!redirect) {
		return '/';
	} else {
		const urlObj = url.parse(redirect);
		assert(urlObj.host === null);
		return redirect;
	}
}

function isWechat(ctx) {
	const userAgent = ctx.headers['user-agent'];
	return userAgent && userAgent.toLowerCase().includes('micromessenger');
}

module.exports = {
	filterRedirectUrl,
	isWechat,
};
