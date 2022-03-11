const fs = require('fs');
const { execSQL, mysql } = require('../DB/index');
const mime = require('mime');
const { SuccessMode, ErrorMode } = require('../model/responseModel');
const { getToken } = require('../utls/utls');
async function checkUser() {
    const sql = `select count(*) from user`;
    let res;
    try {
        res = await execSQL(sql)
    } catch {
        return false;
    }
    if (res.length >= 1) return false;

    return true;
}
//返回插入的用户id 不成功错误码error为0
async function addUser(req, res) {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.send(new ErrorMode("必要字段未填"));
    }

    let flag = await checkUser();
    if (!flag) {
        res.send(new SuccessMode('注册功能不开放'));
    } else {
        const sql = `insert into user(name,password) 
    values(${mysql.escape(name)},${mysql.escape(password)})`;

        execSQL(sql)
            .then(result => {
                
                res.send(new SuccessMode([{ 'id': result.insertId }]));
            })
            .catch(err => {
                res.send(new ErrorMode("注册失败"));
            })
    }



}
//登录成功返回token
function login(req, res) {
    const { name, password } = req.body;
    //mysql.escape(name)对特殊符号进行转义以免sql注入 注意自带""所以不用加外面的
    //console.log(mysql.escape(name));
    const sql = `select user_id from user 
   where name=${mysql.escape(name)} and password=${mysql.escape(password)}`;
    execSQL(sql)
        .then(result => {
            if (result.length == 0) {
                return res.send(new ErrorMode('密码错误'));
            }
            let data = getToken(result[0].user_id);

            res.send(new SuccessMode([{ user_id: data, name }]));
        })
        .catch(err => {
            res.send(new ErrorMode(err));
        })
}
function checkToken(req, res) {
    const { user_id } = req.body;

    if (user_id) {
        return res.send(new SuccessMode('验证成功'));
    } else {
        return res.send(new ErrorMode('验证失败'));
    }
}
function getUser(req, res) {
    const { user_id } = req.body;
    const sql = `select name,say,img,user_type from user where user_id=${mysql.escape(user_id)}`;
    execSQL(sql)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(new ErrorMode(err));
        })
}


module.exports = {
    login,
    addUser,
    checkToken,
    getUser
}