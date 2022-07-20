/*
* @Author: Nokey
* @Date:   2016-10-27 20:39:22
* @Last Modified by:   Nokey
* @Last Modified time: 2016-10-27 22:12:05
*/

'use strict';

var request = require('request');
var logger  = require('./logger');
var config  = require('../config');

function getToken(code){
  return new Promise((resolve, reject)=>{
    // 请求 access_token
    request({
        method: 'PUT',
        uri: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+config.third_appid+'&secret='+config.third_appsecret+'&code='+code+'&grant_type=authorization_code'
    }, (error, response, body)=>{
      if(!error && response.statusCode == 200){
        var token_data = JSON.parse(body);

        if(!token_data['errcode']){
          logger.info('Get wxWebAuth Token from Internet...');
          resolve(token_data);
        }else{
          logger.error('Request sucess, but get token failed: ' + token_data['errmsg']);
          reject('Request sucess, but get token failed: ' + token_data['errmsg']);
        }
      }else{
        logger.error('wxWebAuth Token Request failed: ' + error);
        reject('wxWebAuth Token Request failed: ' + error);
      }
    });
  });
}

function getUserInfo(token_data){
  return new Promise((resolve, reject)=>{
    // 请求用户信息
    request({
        method: 'PUT',
        uri: 'https://api.weixin.qq.com/sns/userinfo?access_token='+token_data.access_token+'&openid='+token_data.openid+'&lang=zh_CN'
    }, (error, response, body)=>{
      if(!error && response.statusCode == 200){
        var user_data = JSON.parse(body);

        if(!user_data['errcode']){
          logger.info('Get wxWebAuth User data from Internet...');
          resolve(user_data);
        }else{
          logger.error('Request sucess, but get user data failed: ' + user_data['errmsg']);
          reject('Request sucess, but get user data failed: ' + user_data['errmsg']);
        }
      }else{
        logger.error('wxWebAuth User data Request failed: ' + error);
        reject('wxWebAuth User data Request failed: ' + error);
      }
    });
  });
}

function wxWebAuth(code, cb){
  if(!code){
    cb('No code!');
  }else{
    getToken(code)
      .then((token_data)=>{
        return getUserInfo(token_data);
      })
      .then((user_data)=>{
        cb && cb(null, user_data);
      })
      .catch((err)=>{
        logger.error('Promise: '+err);
        cb && cb(err);
      });
  }
}

exports = module.exports = wxWebAuth;

// END