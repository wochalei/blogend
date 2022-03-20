const { execSQL,mysql } = require("../DB/index");
const { SuccessMode, ErrorMode } = require('../model/responseModel');
const fs = require('fs');
const path = require('path');
const { Domain } = require('../config/domin');
function getBlogList(req, res) {
  let { user_id, title, blog_id, page, pageSize } = req.body;
  const start = (page - 1) * pageSize;
  let sql = `select * from blog where   title like ${mysql.escape("%"+title+"%")}`;
  
 
  if (blog_id) {
    sql = `select * from blog where blog_id=${blog_id} `
    execSQL(sql)
    .then((result) => {
        
        res.send(new SuccessMode(result));
    
    })
    .catch((err) => {
      console.log(err);
      res.send(new ErrorMode('字段类型或者缺字段比如token'));
    })

    return;
  }
  if (!title) {
    sql = `select  * from blog limit ${pageSize} OFFSET ${start}`;
    
    execSQL(sql)
      .then((result) => {
        let sql = `select count(*) from blog  `;
        execSQL(sql)
          .then(count => {
            let allCount = count[0]['count(*)'];
            res.send({ data: result, allCount, error: 0 });
          })

      })
      .catch(err => {
        console.log(err);
        res.send(new ErrorMode("getBlogList错误"));
      })
  }else{
    sql = `select * from blog where title like ${mysql.escape("%"+title+"%")} limit ${pageSize} OFFSET ${start}`;
    execSQL(sql)
    .then((result) => {
      sql = `select count(*) from blog where title like ${mysql.escape("%"+title+"%")}`
      console.log(sql);
      execSQL(sql)
        .then(count => {
          console.log(count);
          let allCount = count[0]['count(*)'];
          res.send({ data: result, allCount, error: 0 });
        })

    })
    .catch(err => {
      console.log(err);
      res.send(new ErrorMode("getBlogList错误"));
    })
  } 
  
}
function searchPublic(req, res){
  let { user_id, title, blog_id, page, pageSize } = req.body;
  const start = (page - 1) * pageSize;
  let sql = `select * from blog where  title like ${mysql.escape("%"+title+"%")}`;
  
  if (page) {
    sql = `select  * from blog limit ${pageSize} OFFSET ${start}`
    execSQL(sql)
      .then((result) => {
        let sql = `select count(*) from blog `;
        execSQL(sql)
          .then(count => {
            let allCount = count[0]['count(*)'];
            res.send({ data: result, allCount, error: 0 });
          })

      })
      .catch(err => {
        console.log(err);
        res.send(new ErrorMode("searchPublic错误"));
      })
  }
  if (blog_id){
    sql = `select * from blog where blog_id=${blog_id}`
    execSQL(sql)
    .then((result) => {
        
        res.send(new SuccessMode(result));
    
    })
    .catch((err) => {
      console.log(err);
      res.send(new ErrorMode('字段类型或者缺字段比如token'));
    })

    return;
  }

   
}
function updateBlog(req, res) {
  //获取博客id先
  const { content, title, summary, type, blog_id, user_id, updated } = req.body;
  const sql = `update blog set 
   content=${mysql.escape(content)},title=${mysql.escape(title)},summary=${mysql.escape(summary)},type=${mysql.escape(type)},updated=${updated}
   where user_id=${user_id} and blog_id=${blog_id} `;

  execSQL(sql)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.send(new SuccessMode('修改成功'));
      } else {
        res.send(new SuccessMode('未匹配到'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(new ErrorMode('字段类型或者缺字段比如token'));
    })
}
function deleteBlog(req, res) {
  const { blog_id, user_id } = req.body;
  const sql = `delete from blog where blog_id=${blog_id} and user_id=${user_id} `;
  execSQL(sql)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.send(new SuccessMode('删除成功'));
      } else {
        res.send(new SuccessMode('未匹配到'));
      }
    })
    .catch((err) => {
      res.send(new ErrorMode('字段类型或者缺字段比如token'));
    })
}
function addBlog(req, res) {
  const { content, title, summary, type, created, user_id, img, coverImg } = req.body;
  const url = Domain.url + Domain.img;
  let reg = new RegExp(`${url}`);
  img.forEach((item) => {
    let fsName = item.replace(reg, '');

    fs.unlink(`static/tmp/${fsName}`, (err) => { })

  })

  const sql = `insert into blog(content, title, summary, type, created ,user_id,coverImg)
   values(${mysql.escape(content)},${mysql.escape(title)},${mysql.escape(summary)},"${type}",${created},${user_id},"${coverImg}");`
  execSQL(sql)
    .then((result) => {

      if (result.affectedRows > 0) {
        res.send(new SuccessMode('添加成功'));
      } else {
        res.send(new ErrorMode('添加失败，参数错误'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(new ErrorMode(err));
    })
}
function searchType(req, res) {
  const { page, pageSize,type} = req.body;
  const start = (page - 1) * pageSize; 
 let sql = `select  * from blog where  type=${mysql.escape(type)}  limit ${pageSize} OFFSET ${start}`
  
 
 execSQL(sql)
    .then((result) => {
      let sql = `select count(*) from blog where type="${type}"`;
      execSQL(sql)
        .then(count => {
          let allCount = count[0]['count(*)'];
          res.send({ data: result, allCount, error: 0 });
        })

    })
    .catch(err => {
      console.log(err);
      res.send(new ErrorMode("getBlogList错误"));
    })
}
function getAll (req, res){


 let sql = `select blog_id ,created ,title,type from blog `
  
execSQL(sql)
    .then((result) => {
      res.send(new SuccessMode(result));
    })
    .catch(err => {
      console.log(err);
      res.send(new ErrorMode("getAll错误"));
    })
}

module.exports = {
  getBlogList,
  updateBlog,
  deleteBlog,
  addBlog,
  searchType,
  searchPublic,
  getAll,
  
}