var express = require('express');
var app = express();
var {listing,shop,gethtml} = require('./router/router');

app.all("*",function(req,res,next){
    var ip = 'http://127.0.0.1:3000';
    res.header("Access-Control-Allow-Origin",ip);
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req && req.method && req.method.toLowerCase() == 'options')
        res.sendStatus(200);//让options尝试请求快速结束
    else
        next();
})

app.use('/listings',listing);
app.use('/shop',shop);
app.use('/gethtml',gethtml);

app.listen(3001, () => {
    console.log('backserver is up and running in 3001')
});
