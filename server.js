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
        //������������������*��������������������
        res.header("Access-Control-Allow-Origin",req.headers.origin);
    }
    //�����header����
    res.header("Access-Control-Allow-Headers", "content-type");
    //�������������ʽ
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //��options����������ٽ���
    else
        next();
})

app.use('/listings',listing);
app.use('/shop',shop);

app.listen(3001);
