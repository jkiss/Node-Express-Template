/*
 * @Author: Nokey
 * @Date:   2016-09-23 15:39:11
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 15:16:00
 */

'use strict';

const redis       = require('redis')
const config      = require('../config')
const redisClient = redis.createClient({
        host: config.redis_host,
        port: config.redis_port
        // db  : config.redis_db
        // password: config.redis_password
    })

redisClient.on('error', (err) => {
    if (err) {
        console.error('Connect to redis error: ' + err)
    }
})

redisClient.on('ready', () => {
    console.info('Redis is ready!')
})

exports = module.exports = redisClient