/*
* @Author: Nokey
* @Date:   2016-08-01 20:49:03
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 00:55:32
*/
'use strict';

const conn       = require('../common/mongoClient.js')
const mongoose   = require('mongoose')
const { Schema } = mongoose

const ArticlesSchema = new Schema({
    'title'     : { type: String },
    'cover'     : { type: String },
    'author'    : { type: String },
    'createtime': { type: Date },
    'updatetime': { type: Date }, // 发布日期
    'pv'        : { type: Number },
    'published' : { type: Number }, // 0: 未发布；1: 已发布
    'tags'      : [{ // 'pin': 置顶新闻 etc.
        type: String
    }],
    'content'   : { type: String, default: '' }, // editor's content json
    'other'     : { type: String }
}, { autoIndex: false })

ArticlesSchema.index({createtime: -1})

// link the collection "articless" with schema
conn.model('Articles', ArticlesSchema)

module.exports = conn.model('Articles')