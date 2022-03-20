/*
 * @Author: Nokey
 * @Date:   2016-09-23 16:34:44
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 22:25:58
 */

'use strict';

/**
 * logger.trace('Entering cheese testing');
 * logger.debug('Got cheese.');
 * logger.info('Cheese is Gouda.');
 * logger.warn('Cheese is quite smelly.');
 * logger.error('Cheese is too ripe!');
 * logger.fatal('Cheese was breeding ground for listeria.');
 */

const log4js = require('log4js')
const config = require('../config')

log4js.configure({
    appenders: {
        errLog: {
            type: 'dateFile',
            filename: config.logErrorFile,
            alwaysIncludePattern: true,
            pattern: '.yyyy-MM-dd',
            compress: true
        },
        infoLog: {
            type: 'dateFile',
            filename: config.logInfoFile,
            alwaysIncludePattern: true,
            pattern: '.yyyy-MM-dd',
            compress: true
        }
    },
    categories: {
        errLog: { appenders: ['errLog'], level: config.debug ? 'debug' : 'error' },
        infoLog: { appenders: ['infoLog'], level: config.debug ? 'debug' : 'info' },
        default: { appenders: ['infoLog', 'errLog'], level: 'trace' }
    },
    pm2: true,
    disableClustering: true
})

// console.log(log4js)

module.exports = log4js