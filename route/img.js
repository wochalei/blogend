const express = require('express');
const router = express.Router();
const multer  = require('multer');
const mime = require('mime');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'dist/tmp')
    },
    filename: function (req, file, cb) {
        const type = mime.extension(file.mimetype);
        
      cb(null, `${Date.now()}.${type}`);
    }
  })
  const upload = multer({ storage: storage })
const {add} = require('../control/img');
router.post('',upload.single('img'),add);
module.exports= router;