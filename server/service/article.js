const db = require('../db/db');
let show = () => {
    return new  Promise((resolve, reject) => {
        db.query('select * from article', (rows, err) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      })
}
let showhtml=(id)=>{
  return new Promise((resolve,reject)=>{
    db.query(`select article_html,title from article where id=${id}`,(rows,err)=>{
      if(err) reject(err);
      resolve(rows);
    })
  })
}
let insert=(params)=>{
    return new Promise((resolve,reject)=>{
      let sql=`insert into article (article_html,article_md) values ('${params.article_html}','${params.article_md}')`
      db.query(sql, (rows,err) => {
            if(err) {
              reject(err);
            }
            resolve(rows);
          })
    })
}
let update=(params)=>{
    return new Promise((resolve,reject)=>{
      let sql=`update article set article_html='${params.article_html}',article_md='${params.article_md}',article_time='
      ${params.article_time}',title='${params.title}' where id=${params.id}`
        db.query(sql,(rows,err)=>{
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}
exports.show = show;
exports.insert=insert;
exports.update=update;
exports.showhtml=showhtml;
