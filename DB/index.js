const mysql = require('mysql');
const {mySql_config} = require('../config/mysql')
const connect=mysql.createConnection(mySql_config);
connect.connect();


function execSQL(sql){
    return new Promise((resolve,reject)=>{
        connect.query(sql,(err,result)=>{
            if(err) reject(err);
            else{
                resolve(result);
            }
        })
    })
}

module.exports={
    execSQL,
    mysql
}