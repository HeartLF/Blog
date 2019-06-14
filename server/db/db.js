let mysql=require('mysql');

let server=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'llf12345',
    database:'blog'
});
// 封装的方法
const query=function(sql,callback){
    server.getConnection((err,connection)=>{
        connection.query(sql,(err,rows)=>{
            callback(rows);
            connection.release();
        })
    })
}

exports.query=query