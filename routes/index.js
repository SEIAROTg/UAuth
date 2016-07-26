"use strict";

const express = require('express');
const router = express.Router();

const oauth = require('./oauth');
const api = require('./api');

const login = require('./login');

router.use('/oauth', oauth);
router.use('/api', api);

router.all('/', login, (req, res) => {
	res.end('OK');
});

router.get('/login', (req, res) => {

});

module.exports = router;
