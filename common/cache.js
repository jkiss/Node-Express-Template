/*
 * @Author: Nokey
 * @Date:   2016-09-22 17:35:08
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-02-07 18:25:51
 */

'use strict'

/**
 * Redis cache
 */
const util = require('util')
const redis = require('./redisClient')

const rSetex = util.promisify(redis.setEx).bind(redis)
const rSet = util.promisify(redis.set).bind(redis)
const rGet = util.promisify(redis.get).bind(redis)

/**
 * cache key-value in secends
 *
 * @param {String} key
 * @param {String} value
 * @param {Number} expire
 *
 * @returns Promise
 */
function set(key, value, expire) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }

    if (!!expire) {
        return rSetex(key, expire, value)
    } else {
        return rSet(key, value)
    }
}
exports.set = set

/**
 * get value from cache
 *
 * @param {String} key
 * @returns Promise
 */
function get(key) {
    return rGet(key)
}
exports.get = get
