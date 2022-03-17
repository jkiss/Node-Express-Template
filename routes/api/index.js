/*
 * @Author: Nokey 
 * @Date: 2019-07-13 20:22:12 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 02:25:38
 */
'use strict';

const router = require('express').Router()
const auth = require('../../common/auth')
const { 
    checkDuplicateUsernameOrEmail, 
    checkRolesExisted 
} = require('../../middlewares/verifySignUp')

/*****  User  *****/
const user = require('./user')
router.post('/api/register', [
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
], user.register)
router.post('/api/login', user.login)
router.post('/api/logout', user.logout)

/*****  Article  *****/
const article = require('./article')
router.post('/api/article', auth.isAuthenticated, article.getArticle)

module.exports = router
