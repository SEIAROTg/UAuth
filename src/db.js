const Redis = require('ioredis');
const config = require('./config');

const code = new Redis(config.redis.code);
const wechat = new Redis(config.redis.wechat);

module.exports = {
	code,
	wechat,
};
