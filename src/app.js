const assert = require('assert');
const path = require('path');
const crypto = require('mz/crypto');
const Koa = require('koa');
const _ = require('koa-route');
const serve = require('koa-static');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const redisStore = require('koa-redis');
const hbs = require('koa-hbs');
const routes = require('./routes');
const config = require('./config');

async function errorHandler(ctx, next) {
	try {
		await next();
	} catch (e) {
		e.status = e instanceof assert.AssertionError ? 400 : 500;
		e.expose = e instanceof assert.AssertionError || app.env === 'development';
		throw e;
	}
}

async function CsrfMiddleware(ctx, next) {
	if (!ctx.session.csrfToken) {
		ctx.session.csrfToken = (await crypto.randomBytes(16)).toString('hex');
	}
	await next();
}

const app = new Koa();

const sessionOptions = {
	key: 'sess',
	secure: config.server.https,
	signed: false,
	store: redisStore(config.redis.session),
};

app.proxy = config.server.proxy;
app.use(errorHandler);
app.use(session(sessionOptions, app));
app.use(bodyParser());
app.use(hbs.middleware({
	viewPath: path.join(__dirname, 'views'),
}));
app.use(CsrfMiddleware);
app.use(serve(path.join(__dirname, 'static')));
with (routes) {
	app.use(_.get('/', dashboard));
	app.use(_.get('/wechat', wechat));
	app.use(_.get('/login', login));
	app.use(_.post('/login', login));
	app.use(_.post('/logout', logout));
	app.use(_.get('/authorize', authorize));
	app.use(_.get('/user_info', userInfo));
}

app.listen(process.env.PORT || config.server.port || 3000);
