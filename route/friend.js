const express = require('express');
const router = express.Router();
const control = require('../control/friend')
/* 写友链 */
router.post('/add',control.add)
/* 看 */
router.post('/get',control.get)
/* 删 */
router.post('/deleted',control.deleted)
/* 改 */
router.post('/update',control.update)
module.exports= router;