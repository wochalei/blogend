const {execSQL,mysql} = require('../DB/index');
const {SuccessMode,ErrorMode} = require('../model/responseModel');
const {sendMail} = require('../utls/email');
function add(req,res){
  let {userName,blog_id,content,time,pid,email,flag,target}=req.body;
  if(!flag) flag="false";
  if(!target) target='';
  const sql =
  `insert into comments(userName,blog_id,content,time,pid,email,flag,target)values(${mysql.escape(userName)},${mysql.escape(blog_id)},${mysql.escape(content)},
${mysql.escape(time)},${mysql.escape(pid)},${mysql.escape(email)},${mysql.escape(flag)},${mysql.escape(target)});`
 
  execSQL(sql)
  .then((result) => {
    if (result.affectedRows > 0) {
      
      res.send(new SuccessMode('添加成功'));
    } else {
      res.send(new  ErrorMode('添加失败'));
    }
  })
  .catch((err) => {
    console.log(err);
    res.send(new ErrorMode('参数类型错误或缺漏'));
  })
}
function get(req,res){
   let {blog_id}=req.body;
   let sql =`select * from comments `; 
   if(blog_id)
    sql =`select * from comments where blog_id=${mysql.escape(blog_id)}`;
 
   
   execSQL(sql)
  .then((result) => {
      res.send(new SuccessMode(result));
  })
  .catch((err) => {
    res.send(new ErrorMode('参数类型错误或缺漏'));
  })
}
function deleted(req,res){
  const {id}=req.body;
  const sql =`delete from comments where id=${mysql.escape(id)}`;
  execSQL(sql)
 .then((result) => {
     res.send(new SuccessMode(result));
 })
 .catch((err) => {
   res.send(new ErrorMode('参数类型错误或缺漏'));
 })
}
function reply(req,res){
   const {title,content,email} = req.body;
   sendMail(email,{title,content})
   .then(r=>{
     add(req,res);
   })
   .catch(e=>{
    res.send(new ErrorMode('邮箱错误'));
   })
} 
module.exports={
  get,
  add,
  deleted,
  reply
}