/*
 * @Author: Nokey 
 * @Date: 2019-07-10 10:33:25 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-15 14:00:53
 */
'use strict'; 

const express = require('express')
const router  = express.Router()

exports.admin = (req, res, next)=>{
    res.status(200).render('admin', { title: 'admin' })
}

// exports.article_list = (req, res, next)=>{
//     res.status(200).render('article_list', { title: 'article_list' })
// }

// exports.article_edit = (req, res, next)=>{
//     res.status(200).render('article_edit', { title: 'article_edit' })
// }