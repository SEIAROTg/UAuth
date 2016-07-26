"use strict";

const express = require('express');
const router = express.Router();
const assert = require('chai').assert;

const app = require('./app');

router.use('/app', app);

router.get('/loginLog', (req, res) => {

});

module.exports = router;
