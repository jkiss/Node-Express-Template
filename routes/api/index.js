/*
 * @Author: Nokey 
 * @Date: 2019-07-13 20:22:12 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 02:25:38
 */
'use strict';

const router = require('express').Router()
// const auth = require('../../common/auth')
const { verifyToken, isAdmin } = require('../../middlewares/authJwt')
const { 
    checkDuplicateUsernameOrEmail, 
    checkRolesExisted 
} = require('../../middlewares/verifySignUp')

/*****  User  *****/
const { 
    register, 
    login, 
    logout 
} = require('./user')
router.post('/api/register', [
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
], register)
router.post('/api/login', login)
router.post('/api/logout', logout)

/*****  admin  *****/
const { 
    createArticle,
    storeArticle,
    publishArticle,
    deleteArticle,
    getArticles,
} = require('./article')
router.post('/api/admin/*', [verifyToken, isAdmin])
router.post('/api/admin/create-article', createArticle)
router.post('/api/admin/store-article', storeArticle)
router.post('/api/admin/publish-article', publishArticle)
router.post('/api/admin/delete-article', deleteArticle)
router.post('/api/admin/get-articles', getArticles)

module.exports = router
