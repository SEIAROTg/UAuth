const mariasql = require('mariasql');
const co = require('co');

const config = require('./config');

const promisify = require('./common').promisify;

const db = new mariasql(config.db);

module.exports = db;
