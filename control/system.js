const { execSQL, mysql } = require('../DB/index');
const { SuccessMode, ErrorMode } = require('../model/responseModel');
const  {Domain} = require('../config/domin');

function get(req, res) {
    let sql= `select * from blogsystem `;
  
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
    let {img_one,img_two,count} = req.body;
    let sql ='';
   
    if(count==undefined){
       if(!img_one) {
      if(req.files.img_one)
      img_one=Domain.url+'/tmp/'+req.files.img_one[0].filename;
    }
    if(!img_two){
      if(req.files.img_two)
      img_two=Domain.url+'/tmp/'+req.files.img_two[0].filename;
    }
      sql = `update blogsystem set img_one="${img_one}",img_two="${img_two}" where id =${1}`; 
    }else{
     sql =`update blogsystem set count=${count+1} where id =${1}`
    }
    
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
    update,
    
}