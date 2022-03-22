/*
 * @Author: Nokey 
 * @Date: 2019-07-10 10:33:25 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2022-03-23 02:13:02
 */
'use strict'; 

const express = require('express')
const router  = express.Router()

exports.cms = (req, res, next)=>{
    res.status(200).render('home', { title: 'CMS' })
}