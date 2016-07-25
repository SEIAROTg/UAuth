"use strict";

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

let changed = false;

if (!config.session.secret) {
	config.session.secret = crypto.randomBytes(16).toString('hex');
	changed = true;
}

if (changed) {
	fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config, null, '\t'));
}

module.exports = config;
