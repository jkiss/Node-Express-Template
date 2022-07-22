'use strict'

/**
 * Fetch wx ticket, store it in redis
 */

const crypto = require('crypto')
const request = require('request')
const redis = require('./cache')

// weixin jssdk
const wx_appid = process.env.WX_APPID
const wx_appsecret = process.env.WX_APPSECRET
const wx_token_key = 'wxToken'
const wx_ticket_key = 'wxTicket'
const expire_offset = 180

function requestToken() {
    return new Promise((resolve, reject) => {
        // 请求 access_token
        request(
            {
                method: 'PUT',
                uri:
                    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
                    wx_appid +
                    '&secret=' +
                    wx_appsecret,
            },
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var token_data = JSON.parse(body)

                    if (!token_data['errcode']) {
                        // Cache access_token in redis
                        var access_token = token_data['access_token'],
                            expires_in = token_data['expires_in']

                        redis.set(
                            wx_token_key,
                            access_token,
                            expires_in - expire_offset,
                            (err, reply) => {
                                if (err) {
                                    console.error('Cache wxToken error: ' + err)
                                } else {
                                    console.info('Cache wxToken success!')
                                }
                            }
                        )

                        console.info('Get Token from Internet...')
                        resolve(access_token)
                    } else {
                        console.error(
                            'Request sucess, but get token failed: ' +
                                token_data['errmsg']
                        )
                        reject(
                            'Request sucess, but get token failed: ' +
                                token_data['errmsg']
                        )
                    }
                } else {
                    console.error('Token Request failed: ' + error)
                    reject('Token Request failed: ' + error)
                }
            }
        )
    })
}

function requestTicket(access_token) {
    return new Promise((resolve, reject) => {
        // 请求 ticket
        request(
            {
                method: 'PUT',
                uri:
                    'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' +
                    access_token +
                    '&type=jsapi',
            },
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var ticket_data = JSON.parse(body)

                    if (ticket_data['errcode'] == 0) {
                        // 全局缓存 ticket
                        var ticket = ticket_data['ticket'],
                            expires_in = ticket_data['expires_in']

                        redis.set(
                            wx_ticket_key,
                            ticket,
                            expires_in - expire_offset,
                            (err, reply) => {
                                if (err) {
                                    console.error(
                                        'Cache wxTicket error: ' + err
                                    )
                                } else {
                                    console.info('Cache wxTicket success!')
                                }
                            }
                        )

                        console.info('Get Ticket from Internet: ' + ticket)
                        resolve(ticket)
                    } else {
                        console.error(
                            'Request sucess, but get ticket failed: ' +
                                ticket_data['errmsg']
                        )
                        reject(
                            'Request sucess, but get ticket failed: ' +
                                ticket_data['errmsg']
                        )
                    }
                } else {
                    console.error('Ticket Request failed: ' + error)
                    reject('Ticket Request failed: ' + error)
                }
            }
        )
    })
}

function getToken() {
    return new Promise((resolve, reject) => {
        redis.get(wx_token_key, (err, data) => {
            // TODO: redis get token
            if (data) {
                console.info('Get Token from Redis...')
                resolve(data)
            } else {
                console.info(typeof data)
                resolve(requestToken())
            }
        })
    })
}

function getTicket(token) {
    return new Promise((resolve, reject) => {
        redis.get(wx_ticket_key, (err, data) => {
            if (data) {
                console.info('Get Ticket from Redis: ' + data)
                resolve(data)
            } else {
                resolve(requestTicket(token))
            }
        })
    })
}

function getWxSignature(url, ticket, timestamp, noncestr) {
    var sign_args = {
            jsapi_ticket: ticket,
            noncestr: noncestr,
            timestamp: timestamp,
            url: url,
        },
        crypto_str = createSignString(sign_args),
        shasum = crypto.createHash('sha1')

    shasum.update(crypto_str)

    return shasum.digest('hex')
}

function wxJssdkAuth(url, cb) {
    var originUrl = url,
        timestamp = createTimestamp(),
        noncestr = createNonceStr()

    if (!url) {
        cb('No url!')
    } else {
        getToken()
            .then((token) => {
                return getTicket(token)
            })
            .then((ticket) => {
                var signature = getWxSignature(
                    originUrl,
                    ticket,
                    timestamp,
                    noncestr
                )
                console.info('signature: ' + signature)
                cb &&
                    cb(null, {
                        appId: wx_appid,
                        timestamp: timestamp,
                        nonceStr: noncestr,
                        signature: signature,
                    })
            })
            .catch((err) => {
                console.error('JSSDK Promise: ' + err)
                cb && cb(err)
            })
    }
}

exports = module.exports = wxJssdkAuth

/*****    Wx Func Tools     *****/
function createNonceStr(len) {
    len = len || 16
    var chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        chars_len = chars.length,
        str = ''

    for (var i = 0; i < len; i++) {
        str += chars[Math.floor(Math.random() * chars_len)]
    }

    return str
}

function createSignString(obj) {
    var keys = Object.keys(obj).sort(),
        newArgs = []

    keys.forEach((key, i) => {
        newArgs.push(key + '=' + obj[key])
    })
    console.info('string1: ' + newArgs.join('&'))
    return newArgs.join('&')
}

function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + ''
}

/*****    END: Wx Func Tools     *****/
