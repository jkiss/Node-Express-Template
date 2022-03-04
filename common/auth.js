/*
 * @Author: Nokey 
 * @Date: 2019-07-13 20:01:35 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-13 22:15:18
 */
'use strict'; 

exports.isAuthenticated = (req, res, next)=>{
    // if user is authenticated in the session, carry on
    // TODO: req.isAuthenticated() always return false on localhost
    if (req.isAuthenticated()){
        return next()
    }

    // if they aren't redirect them to the home page
    res.json({
        stat: 401,
        msg: 'Unauthorized operation!'
    })
}