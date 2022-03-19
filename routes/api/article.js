/*
 * @Author: Nokey 
 * @Date: 2019-07-13 21:43:40 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 21:45:09
 */
'use strict';

const { Articles } = require('../../models/Articles')

exports.createArticle = (req, res, next)=>{
    res.json({
        stat: 200,
        data: JSON.stringify([{a: 'b'}])
    })
}

exports.storeArticle = (req, res, next)=>{
    res.json({
        stat: 200,
        data: JSON.stringify([{a: 'b'}])
    })
}

exports.publishArticle = (req, res, next)=>{
    res.json({
        stat: 200,
        data: JSON.stringify([{a: 'b'}])
    })
}

exports.deleteArticle = (req, res, next)=>{
    res.json({
        stat: 200,
        data: JSON.stringify([{a: 'b'}])
    })
}

exports.getArticles = (req, res, next)=>{
    res.json({
        stat: 200,
        data: JSON.stringify([{a: 'b'}])
    })
}