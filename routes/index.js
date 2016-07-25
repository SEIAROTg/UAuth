const express = require('express');
const router = express.Router();

const oauth = require('./oauth');
const api = require('./api');

router.use('oauth', oauth);
router.use('api', api);

router.get('/', (req, res) => {

});

router.get('/login', (req, res) => {

});

module.exports = router;
