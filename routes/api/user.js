/*
 * @Author: Nokey 
 * @Date: 2019-07-13 19:55:19 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-18 02:20:17
 */
'use strict';

const log = require('../../common/logger').getLogger('errLog')
const { User, Role } = require('../../models/User')
const bcrypt = require('bcryptjs')

exports.register = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
}

exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        // verify password
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        // gen token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_OR_KEY, {
            expiresIn: 60 * 60 * 24 * 5 // 5 days
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            token: token
        });
    });
}

exports.logout = (req, res, next) => {
    res.json({
        stat: 200,
        msg: 'Maybe you need delete token by yourself :)'
    })
}