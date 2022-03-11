const { execSQL,mysql } = require('../DB/index');
const {SuccessMode,ErrorMode} = require('../model/responseModel');
//添加类型
function addType(req,res){
  const {type,user_id} = req.body;
  
  const sql =`insert into kinds(type ,user_id) values(${mysql.escape(type)},${user_id});`
  execSQL(sql)
  .then((result) => {
    if (result.affectedRows > 0) {
      res.send(new SuccessMode('添加成功'));
    } else {
      res.send(new SuccessMode('未匹配到'));
    }
    
  })
  .catch((err) => {
    
    res.send(new ErrorMode('已有类型'));
  })
}
//搜索某类型所有blog
function typeSearch(req,res){
    //获取url的type值
   const {type,user_id} = req.body;
   const sql = `select * from blog where type=${mysql.escape(type)} and user_id=${user_id}`;
   execSQL(sql)
   .then((result) => {
     res.send(new SuccessMode(result));
   })
   .catch(err => {
     res.send(new ErrorMode("typeSearch参数类型错误或者参数漏了"));
   })
}
//搜索某用户所有类型
function searchUserType(req,res){
 
  
  const sql = `select * from kinds `;
  execSQL(sql)
  .then((result) => {
   
    res.send(new SuccessMode(result));
  })
  .catch(err => {

    res.send(new ErrorMode("searchUserType参数类型错误或者参数漏了或者重复了"));
  })
}
function deleteUserType(req,res){
  const {user_id,type} = req.body;
  const sql = `delete from kinds where user_id=${user_id} and type=${mysql.escape(type)}`;
  execSQL(sql)
  .then((result) => {
    if (result.affectedRows > 0) {
      res.send(new SuccessMode('删除成功'));
    } else {
      res.send(new SuccessMode('未匹配到'));
    }
  })
  .catch((err) => {
    res.send(new ErrorMode('参数类型错误或缺漏'));
  })
}
function changeUserType(req,res){
  const {user_id,type,value} = req.body;
  const sql = `update kinds set type=${mysql.escape(value)} where user_id=${mysql.escape(user_id)} and type=${mysql.escape(type)} `;
  
  execSQL(sql)
  .then((result) => {
    if (result.affectedRows > 0) {
      res.send(new SuccessMode('修改成功成功'));
    } else {
      res.send(new SuccessMode('未匹配到'));
    }
  })
  .catch((err) => {
    
    res.send(new ErrorMode('参数类型错误或缺漏'));
  })
   
}
module.exports={
    addType,
    typeSearch,
    searchUserType,
    deleteUserType,
    changeUserType
}