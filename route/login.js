const express = require('express');
const router = express.Router();
const control = require ('../control/login');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
const {checkToken} = require('../control/index');
/* 登录 */
router.post('/login',control.login)
/* 注册用户信息 */
router.post('/add',upload.single('img'),control.addUser)
router.post('/check',checkToken,control.checkToken);
router.post('/information',checkToken,control.getUser);
module.exports= router;