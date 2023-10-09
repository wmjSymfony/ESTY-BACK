var express = require('express');
var listing = express.Router();
var shop = express.Router();
var gethtml = express.Router();
var {listingsController,reviewsController} = require('../controller/listingController');
var {htmlController} = require('../controller/htmlController');
var {handleDataController} = require('../controller/handleDataController');
const url = require('url');
const bodyParser = require('body-parser');


listing.get('/', async function(req, res) {
    let result = await listingsController();
    if(result.status == 200){
        res.status(200).send(result.data);
    }else{
        // res.status(result.status).send(result.data);
        res.send({status:result.status,data:result.data});
    }
});
listing.get('/reviews', async function(req, res) {
    let data = await reviewsController();
    res.send(data);
});

gethtml.use( bodyParser.json() );       // to support JSON-encoded bodies
gethtml.get('/',async function (req,res) {
    const queryObject = url.parse(req.url,true).query;
    if(queryObject.id){
        let data = await htmlController(queryObject.id);
        res.send(data);
    }else{
        res.send({status:-1,data:'no id'});
    }
})
gethtml.post('/saveListingHtmlData',async function (req,res) {
    if(req.body.id){
        let data = await handleDataController(req.body);
        res.send(data);
    }else{
        res.send({status:-1,data:'no id'});
    }
})

module.exports = {listing,shop,gethtml};
