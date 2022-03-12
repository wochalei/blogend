const { execSQL, mysql } = require('../DB/index');
const { SuccessMode, ErrorMode } = require('../model/responseModel');
const { verifyToken } = require('../utls/utls');
function get(req, res) {
    const {user_id} =req.body;
    let sql='';
    if(verifyToken(user_id))   sql=`select * from user `;
    else  sql =  `select name,say,img,content_say,introduce from user `

    console.log(sql);  
 
    execSQL(sql)
        .then((result) => {
          
            res.send(new SuccessMode(result));
        })
        .catch((err) => {
            console.log(err);
            res.send(new ErrorMode('无信息'));
        })

}

function update(req,res){
    let {name,say,content_say,user_id,img,password} = req.body;
    try{
      let tmp=verifyToken(user_id);
      user_id=tmp.user_id;
    }catch{
      res.send(new ErrorMode ("toke验证不通过"))
    }
    const sql = `update user set 
    name=${mysql.escape(name)},content_say=${mysql.escape(content_say)},
    img=${mysql.escape(img)},say=${mysql.escape(say)},password=${mysql.escape(password)}
    where user_id=${user_id} `;
   
    execSQL(sql)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.send(new SuccessMode('修改成功成功'));
      } else {
        res.send(new SuccessMode('未匹配到'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(new ErrorMode('参数类型错误或缺漏'));
    })
     
}
function renew(req,res){
  let {introduce,user_id} = req.body;
  const sql = `update user set 
  introduce=${mysql.escape(introduce)} 
  where user_id=${mysql.escape(user_id)}`;
  execSQL(sql)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.send(new SuccessMode('修改成功成功'));
      } else {
        res.send(new SuccessMode('未匹配到'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(new ErrorMode('参数类型错误或缺漏'));
    })
}
module.exports = {
    get,
    renew,
    update
}