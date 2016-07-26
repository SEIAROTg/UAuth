const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const config = require('./config');

const routes = require('./routes/index');

module.exports = () => {
	const app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.set('trust proxy', 'loopback');

	app.use(session({
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: { secure: app.get('env') !== 'development', httpOnly: true },
		store: new FileStore({}),
	}));
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', routes);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	
	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

	return app;
}
