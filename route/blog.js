const express = require('express')
const router = express.Router();
const control = require('../control/blog');
const {checkToken} = require('../control/index');
/* 查 */
router.post('/search',control.getBlogList);
router.post('/search_public',control.searchPublic);
router.post('/searchAll',control.getAll);

/* 改 */
router.post('/update',checkToken,control.updateBlog);
/* 删 */
router.post('/delete',checkToken,control.deleteBlog);
/* 增 */
router.post('/add',checkToken,control.addBlog);
/* 查某类 */
router.post('/type',control.searchType);
module.exports= router;