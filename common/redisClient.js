/*
 * @Author: Nokey
 * @Date:   2016-09-23 15:39:11
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-10 02:34:19
 */

'use strict'

const redis = require('redis')

let opt = {}
if (process.env.REDIS_PWD) {
    opt = { ...opt, password: process.env.REDIS_PWD }
}
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
    },
    ...opt,
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
