/*
 * @Author: Nokey
 * @Date:   2016-10-14 12:40:03
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-06-02 15:15:58
 */

'use strict';

const mysql  = require('mysql')
const config = require('../config')

const cmsDevPool = mysql.createPool({
    connectionLimit: config.cms_dev_mysql_limit,
    host           : config.cms_dev_mysql_host,
    user           : config.cms_dev_mysql_user,
    password       : config.cms_dev_mysql_pwd,
    database       : config.cms_dev_mysql_db,
    charset        : config.cms_dev_mysql_charset
})

let conn_num = 0
cmsDevPool.on('connection', (conn) => {
    console.log('mysql conn: ' + (++conn_num))
})

let cmsDevQuery = (sql, vals, cb) => {
    if (typeof vals === 'function') {
        cb = vals
    }

    cmsDevPool.getConnection((conn_err, conn) => {
        if (conn_err) {
            cb(conn_err, null, null)
        } else {
            conn.query(sql, vals, (sql_err, results, fields) => {
                if (sql_err) {
                    conn.release()

                    cb(sql_err, null, null)
                } else {
                    conn.release()
                    // console.log('mysql conn: ' + (--conn_num))
                    cb(sql_err, results, fields)
                }
            })
        }
    })
}

exports = module.exports = cmsDevQuery