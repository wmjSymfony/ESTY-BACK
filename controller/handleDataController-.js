//引入mysql
const mysqlpromise = require("mysql2/promise");
const mysql = require("mysql2");
var {listingsController,reviewsController} = require('./listingController');
var {deleteHtml} = require('./htmlController');
var connectionpromise,connection;
async function DB() {
    connectionpromise = await mysqlpromise.createConnection({
        host: 'localhost', //数据库地址
        port: '3306',//端口号
        user: 'root',//用户名
        password: '123456',//密码
        database: 'esty'//数据库名称
    });
    connection = await mysql.createConnection({
        host: 'localhost', //数据库地址
        port: '3306',//端口号
        user: 'root',//用户名
        password: '123456',//密码
        database: 'esty'//数据库名称
    });
}
DB();

//listingids 经过校验真实存在的listing数组。
var listingids;
var listingsSales = {};//以上listing的加购数量  和  售卖数量等其他爬取数据

async function handleDataController(request){
    listingids = JSON.parse(JSON.stringify(request.id));
    listingsSales = JSON.parse(JSON.stringify(request.sales));
    let res = await handleData();//存入数据
    deleteHtml(listingids);//删除页面上的html
    return res;
}

//从接口获取数据
async function handleData() {
    console.log('start js fetch',listingids);
    let reviews_nums = {};
    let rating_values = {};
    for(let i = 0;i < listingids.length;i++){
        let temp = await reviewsController(listingids[i]);//循环获取listing中的评论信息
        let res = await insertReviews(temp);//循环插入评价
        console.log(1,res);
        if(temp.status == 200){
            if(temp.hasOwnProperty('data') && temp.data.hasOwnProperty('results')){
                [reviews_nums[listingids[i]],rating_values[listingids[i]]] = hanldeListingReviews(temp.data);
            }
        }
    }
    let result = await listingsController(listingids);
    if(result.status == 200){
        let res = await insertListing(result,reviews_nums,rating_values);
        console.log(2,res);
        res = await insertListingData(result,reviews_nums,rating_values);
        console.log(3,res);
    }
}

//插入评论
async function insertReviews(result) {
    let insertData = [];
    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('results')){
        let data = result.data.results;
        for(let i = 0;i < data.length;i++){
            let nowData = data[i];
            insertData.push([
                isReturnNull(nowData['listing_id']),//int
                isReturnNull(nowData['shop_id']),//integer
                isReturnNull(nowData['rating']),//integer
                nowData['review'].slice(0,400) || null,//string nullable
                isReturnNull(nowData['created_timestamp']),//int
                isReturnNull(nowData['updated_timestamp']),//int
                nowData['image_url_fullxfull'] || null,//string nullable
            ]);
        }
    }
    if(insertData.length > 0){
        let stmt = `INSERT INTO product_comment(listing_id,shop_id,rating,content,audit_time,modified_time,pc1)  VALUES ?  `;
        try {
            const [rows, fields]= await connectionpromise.query(stmt, [insertData]);
            console.log('1 Row inserted:' + rows.affectedRows);
            return {status:200};
        }catch (e) {
            console.log('error',e);
            return {status:-1}
        }
    }
}

//插入listing
async function insertListing(result,reviews_nums,rating_values){
    let insertData = [];
    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('results')){
        let data = result.data.results;
        for(let i = 0;i < data.length;i++){
            let nowData = data[i];
            // console.log(listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['category'] ?  isReturnNull(listingsSales[nowData['listing_id']]['category']) : null)
            // let listingImages = handleListingsImages(nowData.images || []);//处理返回值中的图片数组
            // let listingVideos = handleListingVideos(nowData.videos || []);//处理返回值中的视频数组
            // let [max,min,cost] = handleListingProfileDelivery(nowData.shipping_profile || []);
            insertData.push([
                nowData['listing_id'],//int
                nowData['url'] || null,//string
                nowData['title'] || null,//string

                isReturnNull(nowData['creation_timestamp']),//int
                // null,
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['category'] ?  isReturnNull(listingsSales[nowData['listing_id']]['category']) : null,//'in_carts_num',,//'category'
                nowData['listing_type'] || null, //string

                Array.isArray(nowData['tags']) ? JSON.stringify(nowData['tags']) : (nowData['tags'] || null),//array string
                Array.isArray(nowData['materials']) ? JSON.stringify(nowData['materials']) : (nowData['materials'] || null) ,//array string
                isReturnNull(nowData['item_weight']),//float nullable

                nowData['description'] || null,//string
                nowData['personalization_instructions'],//string Nullable
                nowData['who_made'] || null,//string nullable

                nowData['when_made'] || null,//string nullable
                isReturnNull(nowData['is_supply']),//boolean nullable
                isReturnNull(nowData['is_customizable']),//boolean

                isReturnNull(nowData['is_personalizable']),//boolean
                isReturnNull(nowData['quantity']),//int
                nowData.price && isNotUndefined(nowData.price.divisor) ? isReturnNull(nowData.price.divisor) : null,//obj.int

                nowData.price && isNotUndefined(nowData.price.amount) ? isReturnNull(nowData.price.amount) : null,//obj.int
                nowData.price && nowData.price.currency_code ? nowData.price.currency_code : null,//obj.string
                isReturnNull(nowData.has_variations),//boolean

                nowData.shipping_profile && nowData.shipping_profile.origin_country_iso ? nowData.shipping_profile.origin_country_iso : null,//obj.string nullable
                isReturnNull(nowData.processing_min),//int nullable ?
                isReturnNull(nowData.processing_max),//int nullable ?

                // max,//ship_days_min//接口获取不到
                // min,//ship_days_max//接口获取不到
                // cost,//cost_to_ship//接口获取不到
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['ships_days_min'] ?  isReturnNull(listingsSales[nowData['listing_id']]['ships_days_min']) : null,//'ships_days_min',
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['ships_days_max'] ?  isReturnNull(listingsSales[nowData['listing_id']]['ships_days_max']) : null,//'ships_days_max',
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['cost_to_ship'] ?  isReturnNull(listingsSales[nowData['listing_id']]['cost_to_ship']) : null,//'cost_to_ship',

                isReturnNull(nowData.views),//int ?
                isReturnNull(nowData.num_favorers),//int
                reviews_nums[nowData.listing_id] || null,

                rating_values[nowData.listing_id],
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['in_carts_num'] ?  isReturnNull(listingsSales[nowData['listing_id']]['in_carts_num']) : null,//'in_carts_num',
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['sales_num_1d'] ?  isReturnNull(listingsSales[nowData['listing_id']]['sales_num_1d']) : null,//'sales_num_1d',

                null,//'sales_num',
                null,//'view_num_30d',
                null,//'favorites_num_30d',

                null,//'reviews_num_30d',
                null,//'rating_value_30d',
                null,//'sales_num_30d',

                // listingImages.length > 0 ? listingImages : null,//接口获取不到
                // listingVideos.length > 0 ? listingVideos : null,//接口获取不到
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['image'] ?  isReturnNull(listingsSales[nowData['listing_id']]['image']) : null,//'image',
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['video'] ?  isReturnNull(listingsSales[nowData['listing_id']]['video']) : null,//'video',
                isReturnNull(nowData.last_modified_timestamp),//int

                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['skus'] ?  isReturnNull(listingsSales[nowData['listing_id']]['skus']) : null,//'video',
            ]);
        }
    }
    if(insertData.length > 0){
        let stmt = `INSERT INTO listing_info(
        listing_id,product_url,title,
        create_date,category,listing_type,
        tags,materials,item_weight,
        description,instructions_for_buyers,who_made,
        when_made,is_supply,is_customizable,
        is_personalizable,offer_count,low_price,
        high_price,price_currency,variations,
        ships_from,processing_min,processing_max,
        ship_days_min,ship_days_max,cost_to_ship,
        view_num,favorites_num,reviews_num,
        rating_value,in_carts_num,sales_num_1d,
        sales_num,view_num_30d,favorites_num_30d,
        reviews_num_30d,rating_value_30d,sales_num_30d,
        pc1,video,modified_time,
        sku
        )  VALUES ?  `;
        connection.query(stmt, [insertData],function (err, results,) {
            if(err){
                console.log(err);
                return {status:-1};
            }else{
                console.log('2 Row inserted:' + results.affectedRows);
                return {status:200};
            }
        });
    }
}

//插入listing_data表
async function insertListingData(result,reviews_nums,rating_values) {
    let insertData = [];
    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('results')){
        let data = result.data.results;
        for(let i = 0;i < data.length;i++){
            let nowData = data[i];
            insertData.push([
                nowData['listing_id'],//int
                nowData['title'] || null,//string
                isReturnNull(nowData['quantity']),//int

                isReturnNull(nowData.views),//int ?
                isReturnNull(nowData.num_favorers),//int
                reviews_nums[nowData.listing_id] || null,

                rating_values[nowData.listing_id],
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['in_carts_num'] ?  isReturnNull(listingsSales[nowData['listing_id']]['in_carts_num']) : null,//'in_carts_num',
                listingsSales[nowData['listing_id']] && listingsSales[nowData['listing_id']]['sales_num_1d'] ?  isReturnNull(listingsSales[nowData['listing_id']]['sales_num_1d']) : null,//'sales_num_1d',

                null,//'sales_num',
                null,//'view_num_30d',
                null,//'favorites_num_30d',

                null,//'reviews_num_30d',
                null,//'rating_value_30d',
                null,//'sales_num_30d',

                isReturnNull(nowData.last_modified_timestamp)//int
            ]);
        }
    }
    if(insertData.length > 0){
        let stmt = `INSERT INTO listing_data_info(
        listing_id,title,offer_count,
        view_num,favorites_num,reviews_num,
        rating_value,in_carts_num,sales_num_1d,
        sales_num,view_num_30d,favorites_num_30d,
        reviews_num_30d,rating_value_30d,sales_num_30d,
        modified_time
        )  VALUES ?  `;
        connection.query(stmt, [insertData],function (err, results, fields) {
            if(err){
                console.log(err);
                return {status:-1};
            }else{
                console.log('3 Row inserted:' + results.affectedRows);
                return {status:200};
            }
        });
    }
}

//判断是不是undefined undefined则返回false 不是则返回true
function isNotUndefined(temp) {
    return typeof temp !== 'undefined';
}

//判断是不是undefined 是返回null  不是返回当前值
function isReturnNull(temp) {
    return typeof temp != 'undefined' ? temp : null;
}

//判断是不是数字  数字返回true
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

//判断是不是Boolean 是返回true
function isBoolean(bool) {
    return typeof bool === 'boolean';
}

//处理接口返回的图片
function handleListingsImages(images){
    let listingImages = [];
    for(let j = 0;j < images.length;j++){
        if(images[j].hasOwnProperty('url_fullxfull')) {
            listingImages.push(images[j].url_fullxfull);
        }
    }
    return listingImages;
}

//处理接口返回的视频
function handleListingVideos(videos){
    let listingVideo = [];
    for(let j = 0;j < videos.length;j++){
        if(videos[j].hasOwnProperty('video_state') && videos[j]['video_state'] == 'active' && videos[j].hasOwnProperty('video_url')){
            listingVideo.unshift(videos[j].video_url);
        }else if(videos[j].hasOwnProperty('video_url')){
            listingVideo.push(videos[j].video_url);
        }
    }
    return listingVideo;
}

//处理接口返回的评论 获取总量和平均评分
function hanldeListingReviews(reviews){
    let temp = 0;
    for(let i = 0;i < reviews.results.length;i++){
        temp += isReturnNull(reviews.results[i].rating);
    }
    let rate = (temp/reviews.count).toFixed(2);
    return [isReturnNull(reviews.count), isNumber(rate) ? rate : null];
}

//处理接口返回的商品快递信息
function handleListingProfileDelivery(profile){
    let max = null;
    let min = null;
    let cost = null;
    if(profile && profile.shipping_profile_destinations){
        let tempdata = profile.shipping_profile_destinations;
        for(let n = 0;n < tempdata.length;n++){
            if(tempdata[n]['origin_country_iso'] && tempdata[n]['origin_country_iso'].toLowerCase() == 'us'){
               max = isReturnNull(tempdata[n]['max_delivery_days']);
               min = isReturnNull(tempdata[n]['min_delivery_days']);
               cost = tempdata[n]['primary_cost'] && isNotUndefined(tempdata[n]['primary_cost']["amount"]) ? tempdata[n]['primary_cost']["amount"] : null;
            }
        }
    }
    return [max,min,cost];
}

module.exports = {handleDataController};
