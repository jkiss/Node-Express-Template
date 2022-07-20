/*
 * @Author: Nokey 
 * @Date: 2019-07-13 20:22:12 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-23 02:13:35
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

/*****  CMS  *****/
const { 
    createArticle,
    storeArticle,
    publishArticle,
    deleteArticle,
    getArticles,
} = require('./article')
router.post('/api/cms/*', [verifyToken, isAdmin])
router.post('/api/cms/create-article', createArticle)
router.post('/api/cms/store-article', storeArticle)
router.post('/api/cms/publish-article', publishArticle)
router.post('/api/cms/delete-article', deleteArticle)
router.post('/api/cms/get-articles', getArticles)

/**
 * 微信登陆，签名算法
 */
const { web_auth, jssdk_auth } = require('./wx')
router.post('/api/wx-web-auth/get-userinfo', web_auth)
router.post('/api/wx-jssdk-auth', jssdk_auth)

module.exports = router
