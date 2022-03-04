/*
 * @Author: Nokey 
 * @Date: 2019-07-12 15:47:31 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-12 17:01:28
 */
'use strict'; 

const conn     = require('../common/mongoClient')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const plm      = require('passport-local-mongoose')

let UserSchema = new Schema({
    'nickname': { type: String, default: '' },
    'phone'   : { type: String, default: '' },
    'role'    : { type: String, default: '' },
    'other'   : { type: String, default: '' }
})

// Passport-Local Mongoose will add a username, hash and salt field 
// to store the username, the hashed password and the salt value.
UserSchema.plugin(plm)

conn.model('User', UserSchema)

exports = module.exports = conn.model('User')