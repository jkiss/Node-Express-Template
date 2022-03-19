/*
 * @Author: Nokey
 * @Date:   2016-09-23 15:39:11
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-10 02:34:19
 */

'use strict';

const redis       = require('redis')
// const config      = require('../config')
const redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
        // database: config.redis_db
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