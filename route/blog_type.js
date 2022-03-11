const express = require('express');
const router = express.Router();
const {checkToken} = require('../control/index');
const {addType,typeSearch,searchUserType,deleteUserType,changeUserType} = require('../control/blog_type');
/* 传用户信息 */
router.post('/add',checkToken,addType);
/* 获取用户某类信息 */
router.post('/typesearch',typeSearch);
/* 获取用户所有类 */
router.post('/searchusertype',searchUserType);
/* 删除用户某类 */
router.post('/deleteusertype',checkToken,deleteUserType);
router.post('/changeusertype',checkToken,changeUserType);
module.exports= router;