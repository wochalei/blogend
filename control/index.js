const { verifyToken } = require('../utls/utls');
const { SuccessMode, ErrorMode } = require('../model/responseModel');
//中间件，本来额外创文件夹的，我就算了，也没多少
function checkToken(req,res,next){
     const {user_id} = verifyToken(req.body.user_id);
     //id指user_id 就是不能重复换成id了
     if(user_id){
        req.body.user_id=user_id;
       return  next();
     }

    res.send(new ErrorMode ("toke验证不通过"))
}
module.exports={
    checkToken
}