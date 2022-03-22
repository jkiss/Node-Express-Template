/*
 * @Author: Nokey 
 * @Date: 2019-07-15 09:30:16 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-23 02:12:54
 */
'use strict'; 

const express = require('express')
const router  = express.Router()
const { verifyToken, isAdmin } = require('../../middlewares/authJwt')

/* GET cms page. */
const { cms } = require('./cms')
router.get('/cms/login', cms)
router.get('/cms/*', [verifyToken, isAdmin], cms) // verify token before access admin pages
// router.get('/cms/article-list', cms)
// router.get('/cms/article-editor', cms)

module.exports = router
