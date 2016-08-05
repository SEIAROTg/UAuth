#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const co = require('co');
const mariasql = require('mariasql');
const promisify = require('./common').promisify;

co(function*() {

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question = promisify(rl.question, true);

yield rl.question(`Before continuing, please first:
1. Create a database for UAuth
2. Configure appropriate permission for the created database
3. Enable global scheduler by running "SET GLOBAL event_scheduler = ON;"

Press enter to continue.
`);

let host = (yield rl.question('Database Host (default to localhost):')) || 'localhost';
let port = parseInt(yield rl.question('Database Port (default to 3306):')) || 3306;
let dbName = (yield rl.question('Database Name (default to UAuth):')) || 'UAuth';
let user = yield rl.question('Database Username:');
let password = yield rl.question('Database Password:');

rl.close();

// Create database

let db = new mariasql();
db.connect = promisify(db.connect);
db.query = promisify(db.query);

yield db.connect({
	host,
	port,
	user,
	password,
	db: dbName,
});

yield db.query(`CREATE TABLE IF NOT EXISTS app (
	appid VARCHAR(18) PRIMARY KEY,
	appsecret VARCHAR(40),
	name TEXT NOT NULL,
	ownerType ENUM("individual", "org", "university") NOT NULL,
	ownerName TEXT NOT NULL,
	ownerUser VARCHAR(7) NOT NULL,
	description TEXT NOT NULL,
	status ENUM("pending", "rejected", "enabled", "disabled", "deleted") NOT NULL,
	scope TEXT NOT NULL,
	reason TEXT NOT NULL,
	domains TEXT NOT NULL
)`);

yield db.query(`CREATE TABLE IF NOT EXISTS code (
	code VARCHAR(16) PRIMARY KEY,
	appid VARCHAR(18) NOT NULL,
	user VARCHAR(7) NOT NULL,
	scope TEXT NOT NULL,
	expiration DATETIME NOT NULL,
	FOREIGN KEY (appid) REFERENCES app(appid)
)`);

yield db.query(`CREATE TABLE IF NOT EXISTS admin (
	userId VARCHAR(7) NOT NULL,
	isRoot BOOLEAN NOT NULL
)`);

yield db.query(`CREATE TABLE IF NOT EXISTS log (
	userId VARCHAR(7) NOT NULL,
	time DATETIME NOT NULL,
	action ENUM("Authorization", "Authentication") NOT NULL,
	appid VARCHAR(18),
	os VARCHAR(50),
	browser VARCHAR(50),
	ip VARCHAR(50),
	FOREIGN KEY (appid) REFERENCES app(appid)
)`);

yield db.query(`CREATE EVENT IF NOT EXISTS clearExpiredCode
ON SCHEDULE
	EVERY 1 DAY
DO
	BEGIN
		DELETE FROM code WHERE expiration < NOW();
	END
`);

db.close();

let config = JSON.parse(yield promisify(fs.readFile)(path.resolve(__dirname, 'config.json')));
Object.assign(config, {
	db: {
		host,
		port,
		user,
		password,
		db: dbName,
	}
});
yield promisify(fs.writeFile)(path.resolve(__dirname, 'config.json'), JSON.stringify(config, null, '\t'));

}).done();
