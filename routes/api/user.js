/*
 * @Author: Nokey 
 * @Date: 2019-07-13 19:55:19 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-15 15:58:29
 */
'use strict'; 

const log      = require('../../common/logger').getLogger('errLog')
const User     = require('../../models/User')
const passport = require('passport')

exports.register = (req, res, next)=>{
    let name = req.body.username,
        pwd = req.body.password

    // TODO: verify parameters
    User.register(new User({username: name}), pwd, (err, user)=>{
        if (err) {
            log.error(`Register fail: ${err.name} ${err.message}`)

            return res.json({
                stat: 500,
                msg: `Register fail: ${err.message}`
            })
        }

        req.login(user, (err)=>{
            if(err){
                log.error(`Register fail: ${err.name} ${err.message}`)

                return res.json({
                    stat: 401,
                    msg: `Register successfully, but login fail!`
                })
            }

            res.json({
                stat: 200,
                msg: 'Register and login successfully!'
            })
        })
    })
}

exports.login = (req, res, next)=>{

    passport.authenticate('local', (err, user, info)=>{
        if (err) { return next(err); }
        if (!user) { 
            return res.json({
                stat: 401,
                msg: 'User name or password error!'
            }) 
        }

        // TODO: passport.authenticate() middleware invokes req.login() automatically.
        return res.json({
            stat: 200,
            msg: 'Login successfully!'
        })
    })(req, res, next)
}

exports.logout = (req, res, next)=>{
    req.logout()

    res.json({
        stat: 200,
        msg: 'Logout successfully!'
    })
}