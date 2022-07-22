/*
 * @Author: Nokey
 * @Date: 2019-07-10 16:41:13
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-10 23:57:02
 */
'use strict'

let path = require('path')
let utils = require('../utils')

let uploadPath =
    process.env.NODE_ENV === 'production'
        ? process.env.UPLOADS
        : path.resolve(__dirname, '../uploads')
utils.exitDirify(uploadPath)

let publicPath =
    process.env.NODE_ENV === 'production'
        ? process.env.PUBLIC
        : path.resolve(__dirname, '../public')
utils.exitDirify(publicPath)

let config = {
    debug: true,

    upload_path: uploadPath,

    public_path: publicPath,
}

module.exports = config
