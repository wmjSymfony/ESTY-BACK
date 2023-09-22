var express = require('express');
var app = express();
var {listing,shop} = require('./router');
var {handleData} = require('./handleData');

app.all("*",function(req,res,next){
    var orginList=[
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ]
    if(orginList.includes(req.headers.origin.toLowerCase())){
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin",req.headers.origin);
    }
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.use('/listings',listing);
app.use('/shop',shop);

app.listen(3001);
