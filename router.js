var express = require('express');
var listing = express.Router();
var shop = express.Router();
var {listingsController,reviewsController} = require('./listingController');

listing.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

// define the home page route
listing.get('/', async function(req, res) {
    let result = await listingsController();
    if(result.status == 200){
        res.status(200).send(result.data);
    }else{
        res.status(result.status).send(result.text);
    }
});
// define the about route
listing.get('/reviews', async function(req, res) {
    console.log('reviews');
    let data = await reviewsController();
    res.send(data);
});


// define the home page route
shop.get('/', function(req, res) {
    res.send('Birds home page');
});
// define the about route
shop.get('/data', function(req, res) {
    res.send('listing');
});

module.exports = {listing,shop};
