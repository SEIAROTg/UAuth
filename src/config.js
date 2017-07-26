const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const configPath = fs.readFileSync(path.join(__dirname, '../config.yaml'));
const config = yaml.safeLoad(configPath);

module.exports = config;
