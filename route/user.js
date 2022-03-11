const express = require('express');
const router = express.Router();
const control = require('../control/user');
const multer  = require('multer');
const mime = require('mime');
const {checkToken} = require('../control/index');
const {Domain} = require('../config/domin')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'dist/tmp/')
    },
    filename: function (req, file, cb) {
        
        const type = mime.extension(file.mimetype);
        let url =""+Date.now()+'.'+type;
      cb(null, url);
       req.body.img=Domain.url+'/tmp/'+url;
    }
  })
const upload = multer({ storage: storage })
/* 看 */
router.post('/get',control.get);
/* 改 */
const cpUpload = upload.fields([{name:'img'}]);
router.post('/update',cpUpload,control.update);
router.post('/introduce',checkToken,cpUpload,control.renew);
module.exports= router;