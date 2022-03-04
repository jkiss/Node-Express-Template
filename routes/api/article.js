/*
 * @Author: Nokey 
 * @Date: 2019-07-13 21:43:40 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 21:45:09
 */
'use strict'; 

exports.getArticle = (req, res, next)=>{
    res.json({
        stat: 200,
        data: JSON.stringify([{a: 'b'}])
    })
}