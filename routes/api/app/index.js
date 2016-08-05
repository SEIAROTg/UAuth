"use strict";

const express = require('express');
const router = express.Router();

const isAdmin = require('../isAdmin');

const transfer = require('./transfer');
const reset = require('./reset');
const domains = require('./domains');
const get = require('./get');
const approve = require('./approve');
const reject = require('./reject');
const del = require('./del');


// 列出属于当前用户的app
router.get('/my', (req, res) => {

});

// 申请接口
router.post('/', (req, res) => {

});

// 转让app
router.post('/:id/transfer', transfer);

// 重置appsecret
router.post('/:id/reset', reset);

// 修改跳转域名
router.put('/:id/domains', domains);

router.use(isAdmin);

// 列出app
router.get('/all', (req, res) => {

});

// 查看app信息
router.get('/:id', get);

// 批准接口申请
router.post('/:id/approve', approve);

// 拒绝接口申请
router.post('/:id/reject', reject);

// 删除接口
router.delete('/:id', del);

module.exports = router;
