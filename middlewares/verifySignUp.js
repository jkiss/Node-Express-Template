/* 
 * @Author: Mr.B 
 * @Date: 2022-03-18 01:11:30 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 01:23:41
 */
'use strict';

const { User } = require('../models')

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }
            next();
        });
    });
}

exports.checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }
    next()
}