/*
 * @Author: Nokey
 * @Date:   2016-09-29 11:44:02
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-15 13:52:10
 */

'use strict';

const config   = require('../config')
const mongoose = require('mongoose')
const conn     = mongoose.createConnection(config.db_myapp, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})

// test conn events
conn.on('error', (err)=>{
    console.error('Connection error: ' + err)
})

conn.once('connected', ()=>{
    console.info('MongoDB test connection successfully!')
})

exports = module.exports = conn