const express = require('express')
const router = express.Router();
const {add,get,deleted,reply} = require('../control/comment');
/* 写某博客评论 */
router.post('/add',add);
/* 得某博客评论 */
router.post('/get',get);
router.post('/deleted',deleted);
router.post('/reply',reply);
module.exports=router;