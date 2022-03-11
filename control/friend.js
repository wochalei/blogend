const { execSQL, mysql } = require('../DB/index');
const { SuccessMode, ErrorMode } = require('../model/responseModel');
function get(req, res) {
    const {id} =req.body;
    let sql='';
    if(!id)  sql= `select * from friend `;
    else  sql =  `select * from friend where id=${mysql.escape(id)}`;
    execSQL(sql)
        .then((result) => {
            res.send(new SuccessMode(result));
        })
        .catch((err) => {
            console.log(err);
            res.send(new ErrorMode('无信息'));
        })

}
function add(req, res) {
    const { name, url, img,say } = req.body;
    const sql =`insert into friend(name,url,img,say)values(${mysql.escape(name)},${mysql.escape(url)},${mysql.escape(img)},${mysql.escape(say)});`
    execSQL(sql)
        .then((result) => {
            res.send(new SuccessMode("添加成功"));
        })
        .catch((err) => {
            console.log(err);
            res.send(new ErrorMode('添加失败'));
        })
}
function deleted(req, res) {
    const { id} = req.body;
    const sql =`delete from friend where id=${mysql.escape(id)}`;
    execSQL(sql)
    .then((result) => {
        res.send(new SuccessMode("删除成功"));
    })
    .catch((err) => {
        
        res.send(new ErrorMode('删除失败'));
    })
}
function update(req,res){
    const {name,url,img,say,id} = req.body;
    const sql = `update friend set 
    name=${mysql.escape(name)},url=${mysql.escape(url)},img=${mysql.escape(img)},say=img=${mysql.escape(say)} 
    where id=${mysql.escape(id)}`;
    
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
module.exports = {
    get,
    add,
    deleted,
    update
}