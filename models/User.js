/*
 * @Author: Nokey 
 * @Date: 2019-07-12 15:47:31 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 00:55:26
 */
'use strict'; 

const conn       = require('../common/mongoClient')
const mongoose   = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    'username': { type: String },
    'password': { type: String },
    'email'   : { type: String },
    'nickname': { type: String },
    'phone'   : { type: String },
    'roles'   : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
})

conn.model('User', UserSchema)

module.exports = conn.model('User')