/*
 * @Author: Nokey
 * @Date: 2017-06-27 16:47:46
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-28 20:20:11
 */
'use strict'

var wxJssdkAuth = require('../../common/wxJssdkAuth')
var wxWebAuth = require('../../common/wxWebAuth')

exports.web_auth = (req, res, next) => {
    wxWebAuth(req.body.code, (err, userInfo) => {
        if (err) {
            res.status(500).json({
                stat: 500,
                msg: 'Server Error: ' + err,
            })
        } else {
            res.json(userInfo)
        }
    })
}

exports.jssdk_auth = (req, res, next) => {
    wxJssdkAuth(req.body.url, (err, authData) => {
        if (err) {
            res.status(500).json({
                stat: 500,
                msg: 'Server Error: ' + err,
            })
        } else {
            res.json(authData)
        }
    })
}
