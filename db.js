const mariasql = require('mariasql');

const config = require('./config');

const promisify = require('./common').promisify;

const db = new mariasql(config.db);

db.query = promisify(db.query);

module.exports = db;
