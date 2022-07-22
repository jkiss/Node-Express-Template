/*
 * @Author: Nokey
 * @Date:   2016-09-29 11:44:02
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 00:55:54
 */

'use strict'

// const config   = require('../config')
const mongoose = require('mongoose')
const conn = mongoose.createConnection(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
)

// test conn events
conn.on('error', (err) => {
    console.error('Connection error: ' + err)
})

conn.once('connected', () => {
    console.info('MongoDB test connection successfully!')
})

module.exports = conn
