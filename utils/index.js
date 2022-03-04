/*
 * @Author: Nokey 
 * @Date: 2019-07-10 17:42:38 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 22:30:44
 */
'use strict'; 

const fs  = require('fs')

/**
 * detect whether path exit or not
 */
exports.exitDirify = (pathStr)=>{
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr, {
            recursive: true
        })
        console.info('Create folder: ' + pathStr)
    }
    
    return pathStr
}