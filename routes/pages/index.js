/*
 * @Author: Nokey 
 * @Date: 2019-07-15 09:30:16 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-07-15 09:32:47
 */
'use strict'; 

const express = require('express')
const router  = express.Router()

/* GET home page. */
const { home } = require('./home')
router.get(/^\/(home)?/, home)

module.exports = router
