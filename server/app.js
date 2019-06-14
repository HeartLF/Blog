const express=require('express');
const bodyParser=require('body-parser');
const articleApi=require('./router/router')
const app=express();
const multer = require('multer')
const upload = multer({ dest: './uploads/' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(upload.single('file'));

app.get('/api/all_article',articleApi);
app.post('/api/insert_article',articleApi);
app.post('/api/upload',articleApi);
app.get('/api/selectHtml',articleApi)
app.post('/api/updateHtml',articleApi)
app.listen(3000);