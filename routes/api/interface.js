"use strict";

const express = require('express');
const router = express.Router();
const assert = require('chai').assert;


// 列出app
router.get('/all', (req, res) => {

});

// 列出属于当前用户的app
router.get('/my', (req, res) => {

});

// 申请接口
router.post('/', (req, res) => {

});

// 查看app信息
router.get('/:id', (req, res) => {

});

// 批准接口申请
router.post('/:id/approve', (req, res) => {

});

// 拒绝接口申请
router.post('/:id/reject', (req, res) => {

});

// 吊销接口
router.post('/:id/revoke', (req, res) => {

});

// 转让app
router.post('/:id/transfer', (req, res) => {

});

// 重置appsecret
router.post('/:id/reset', (req, res) => {

});

// 修改app
router.patch('/:id', (req, res) => {

});

module.exports = router;
