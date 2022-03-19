/*
 * @Author: Nokey 
 * @Date: 2019-07-10 16:41:13 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-10 23:57:02
 */
'use strict'; 

let path         = require('path')
let utils        = require('../utils')
let logErrorPath = process.env.NODE_ENV === 'production' ? '/var/log/log4js/error': path.resolve(__dirname, '../logs/error')
let logInfoPath  = process.env.NODE_ENV === 'production' ? '/var/log/log4js/info' : path.resolve(__dirname, '../logs/info')
utils.exitDirify(logErrorPath)
utils.exitDirify(logInfoPath)

let uploadPath   = process.env.NODE_ENV === 'production' ? '/var/uploads'         : path.resolve(__dirname, '../uploads')
utils.exitDirify(uploadPath)

let publicPath   = process.env.NODE_ENV === 'production' ? '/home/public'         : path.resolve(__dirname, '../public')
utils.exitDirify(publicPath)

let config = {
    debug: true,

    upload_path: uploadPath,

    public_path: publicPath,

    // MongoDB
    // db_myapp: 'mongodb://test:test@localhost:27017/test',
    db_myapp: 'mongodb://localhost:27017/test',

    // Redis
    redis_host: '127.0.0.1',
    redis_port: 6379,
    // redis_db: 0,
    // redis_password: '123qwe',

    // log4js
    logErrorFile: logErrorPath + '/err.log',
    logInfoFile: logInfoPath + '/info.log',

    // cors: {
    //     white_list: [/\.domain1\.com$/, /\.domain2\.me$/]
    // },
    
    // https: {
    //     cert: '/etc/letsencrypt/live/url/cert.pem',
    //     key: '/etc/letsencrypt/live/url/privkey.pem',
    //     ca: '/etc/letsencrypt/live/url/chain.pem'
    // }
}

module.exports = config
