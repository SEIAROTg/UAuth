const express = require('express');
const router = express.Router();

const oauth = require('./oauth');

router.use('oauth', oauth);

module.exports = router;
