/* 
 * @Author: Mr.B 
 * @Date: 2022-03-17 22:22:06 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 00:55:19
 */

const conn       = require('../common/mongoClient')
const mongoose   = require('mongoose')
const { Schema } = mongoose

const RoleSchema = new Schema({
    name: { type: String }
})

conn.model('Role', RoleSchema)

module.exports = conn.model('Role')