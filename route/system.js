const express = require('express');
const router = express.Router();
const control = require('../control/system');
const multer  = require('multer');
const mime = require('mime');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'dist/tmp/')
    },
    filename: function (req, file, cb) {
        
        const type = mime.extension(file.mimetype);
        let url =""+Date.now()+'.'+type;
        cb(null, url);
    }
  })
  const upload = multer({ storage: storage })
/* 看 */
router.post('/get',control.get);
/* 改 */
const cpUpload = upload.fields([{name:'img_one'},{name:'img_two'}]);
router.post('/update',cpUpload,control.update);

module.exports= router;