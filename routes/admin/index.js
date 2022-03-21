/*
 * @Author: Nokey 
 * @Date: 2019-07-15 09:30:16 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-15 09:32:47
 */
'use strict'; 

const express = require('express')
const router  = express.Router()
const { verifyToken, isAdmin } = require('../../middlewares/authJwt')

/* GET admin page. */
const { admin } = require('./admin')
router.get('/admin/login', admin)
router.get('/admin/*', [verifyToken, isAdmin], admin) // verify token before access admin pages
// router.get('/admin/article-list', admin)
// router.get('/admin/article-editor', admin)

module.exports = router
