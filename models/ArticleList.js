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

const ArticleListSchema = new Schema({
    'id'               : { type: Number },
    'videourl'         : { type: String },
    'audiourl'         : { type: String },
    'imgurl'           : { type: String },
    'shareurl'         : { type: String },
    'author'           : { type: String },
    'speciallabel'     : { type: String },
    'speciallabelcolor': { type: String },
    'detailurl'        : { type: String },
    'title'            : { type: String },
    'likenum'          : { type: Number },
    'newstime'         : { type: Date },
    'type'             : { type: Number }
})

ArticleListSchema.index({newstime: -1})

// link the collection "articlelists" with schema
conn.model('ArticleList', ArticleListSchema)

module.exports = conn.model('ArticleList')