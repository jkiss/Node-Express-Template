/*
 * @Author: Nokey 
 * @Date: 2019-07-13 20:22:12 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 22:15:44
 */
'use strict'; 

const router = require('express').Router()
const auth   = require('../../common/auth')

/*****  User  *****/
const user = require('./user')
router.post('/api/register', user.register)
router.post('/api/login', user.login)
router.post('/api/logout', user.logout)

/*****  Article  *****/
const article = require('./article')
router.post('/api/article', auth.isAuthenticated, article.getArticle)

module.exports = router
