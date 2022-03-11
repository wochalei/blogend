
const {Domain} = require('../config/domin');
function add(req,res){
  let file =req.file;
  console.log(file);
  res.send(JSON.stringify({url:Domain.url+Domain.img+file.filename}));
}
module.exports = {
   add
}