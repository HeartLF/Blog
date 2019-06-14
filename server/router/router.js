const express=require('express');
const router=express.Router();
const fs=require('fs');
const path=require('path');
const mark=require('marked');
const db = require('../db/db');
router.get('/api/all_article',async (req,res,next)=>{
    try {
        let result = await require('../service/article').show();
        res.json(result);
      } catch (e) {
        res.send(e);
      }
})
router.post('/api/insert_article',async(req,res,next)=>{
    try {
        let params=req.body;
        // let sql=`insert into article (title,article_html,article_md) values ("笔记",${params.article_html}","${params.article_md}")`
        // for(item in params){
        //     // var result=await require('../service/article').insert(item,params[item]);
        //     str=str+params[item]+','
        // }
        var result=await require('../service/article').insert(params);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})
router.post('/api/upload', (req,res,next)=>{
    let file=req.file;
    let filename=`${file.path}`.split('');
    let name=filename.splice(0,filename.indexOf('\\')+1).join('');
    let newName=name+'\\'+file.originalname;
    fs.rename(file.path,newName,(err)=>{
        if(err)
            res.send('修改失败');
        else{
            fs.readFile(newName,async(err,data)=>{
                if(err){
                    console.log(err);   
                }else{
                    let word=mark(data.toString());
                    let txt=deleteLabel(word);
                    let txt2=txt.split('').splice(0,200).join('').trim().replace(/[\r\n]/g, "");
                    let obj={
                        article_html:word,
                        article_md:txt2
                    };
                    try {
                        var result=await require('../service/article').insert(obj);
                        res.send(result);
                      } catch (err) {
                        console.log(err);
                      }
                }
            })
        }
    })
})
router.get('/api/selectHtml',async(req,res,next)=>{
    let {id}=req.query;
    try {
        let result=await require('../service/article').showhtml(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})
router.post('/api/updateHtml',async (req,res,next)=>{
    let params=req.body;
    try {
        let result=await require('../service/article').update(params);
        console.log(result);
        if(result.affectedRows>0){
            res.json({
                status:200,
                message:'修改成功'
            })
        }
        // res.send(result);
    } catch (error) {
        res.send(error);
    }
})
function deleteLabel(html) {
    let regEx_script = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g; // 定义script的正则表达式
    let regEx_style = /<stype\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/stype>/g; // 定义style的正则表达式
    let regEx_html = /<(?:.|\s)*?>/g; // 定义HTML标签的正则表达式
    html = html.replace(regEx_script, "");
    html = html.replace(regEx_style, "");
    html = html.replace(regEx_html, "");
    html = html
      .replace("((\r\n)|\n)[\\s\t ]*(\\1)+", "$1")
      .replace("^((\r\n)|\n)", ""); //去除空白行
    html = html.replace("    +| +|　+", ""); //去除空白
    return html.trim();
  }
module.exports=router;