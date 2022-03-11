const jwt = require('jsonwebtoken');
const config_token = require('../config/token')
function getToken(id) {
    const token = jwt.sign(
        {
           user_id:id
        },
        config_token.key,
        {
            expiresIn: config_token.expiresIn
        }
    )
    return token;
}
function verifyToken(token){
   try{
    const decode= jwt.verify(token,config_token.key);
    return decode;
   }catch{
    return false;
   } 
}
function clearTmp(){
    
}
/* console.log(getToken(10));  */
module.exports = {
    getToken,
    verifyToken,
    clearTmp,
}