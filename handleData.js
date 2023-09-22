var express = require('express');
//����mysql
const mysqlpromise = require("mysql2/promise");
const mysql = require("mysql2");
var {listingsController,reviewsController} = require('./listingController');
var connectionpromise,connection;
async function DB() {
    connectionpromise = await mysqlpromise.createConnection({
        host: 'localhost', //���ݿ��ַ
        port: '3306',//�˿ں�
        user: 'root',//�û���
        password: '123456',//����
        database: 'esty'//���ݿ�����
    });
    connection = await mysql.createConnection({
        host: 'localhost', //���ݿ��ַ
        port: '3306',//�˿ں�
        user: 'root',//�û���
        password: '123456',//����
        database: 'esty'//���ݿ�����
    });
}
DB();

var listingids = [1,2,3]
handleData();
async function handleData() {
    let reviews_nums = {};
    let rating_values = {};
    for(let i = 0;i < listingids.length;i++){
        let temp = await reviewsController(listingids[i]);//ѭ����ȡlisting�е�������Ϣ
        await insertReviews(temp);//ѭ����������
        if(temp.status == 200){
            if(temp.hasOwnProperty('data') && temp.data.hasOwnProperty('results')){
                [reviews_nums[listingids[i]],rating_values[listingids[i]]] = hanldeListingReviews(temp.data);
            }
        }
    }
    let result = await listingsController(listingids);
    if(result.status == 200){
        await insertListing(result,reviews_nums,rating_values);
        await insertListingData(result,reviews_nums,rating_values);
    }
}

//��������
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
                nowData['review'] || null,//string nullable
                isReturnNull(nowData['created_timestamp']),//int
                isReturnNull(nowData['updated_timestamp']),//int
                nowData['image_url_fullxfull'] || null,//string nullable
            ]);
        }
    }
    console.log(1);
    if(insertData.length > 0){
        let stmt = `INSERT INTO product_comment(listing_id,shop_id,rating,content,audit_time,modified_time,pc1)  VALUES ?  `;
        try {
            const [rows, fields]= await connectionpromise.query(stmt, [insertData]);
            console.log('1 Row inserted:' + rows.affectedRows);
        }catch (e) {
            console.log('error',e);
        }
    }
}

//����listing
async function insertListing(result,reviews_nums,rating_values){
    let insertData = [];
    if(result.hasOwnProperty('data') && result.data.hasOwnProperty('results')){
        let data = result.data.results;
        for(let i = 0;i < data.length;i++){
            let nowData = data[i];
            let listingImages = handleListingsImages(nowData.images || []);//������ֵ�е�ͼƬ����
            let listingVideos = handleListingVideos(nowData.videos || []);//������ֵ�е���Ƶ����
            let [max,min,cost] = handleListingProfileDelivery(nowData.shipping_profile || []);
            insertData.push([
                nowData['listing_id'],//int
                nowData['url'] || null,//string
                nowData['title'] || null,//string

                isReturnNull(nowData['creation_timestamp']),//int
                null,//'category'
                nowData['listing_type'] || null, //string

                Array.isArray(nowData['tags']) ? JSON.stringify(nowData['tags']) : (nowData['tags'] || null),//array string
                Array.isArray(nowData['materials']) ? JSON.stringify(nowData['materials']) : (nowData['materials'] || null) ,//array string
                isReturnNull(nowData['item_weight']),//float nullable

                nowData['description'] || null,//string
                null,//instructions_for_buyers
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

                max,
                min,
                cost,

                isReturnNull(nowData.views),//int ?
                isReturnNull(nowData.num_favorers),//int
                reviews_nums[nowData.listing_id] || null,

                rating_values[nowData.listing_id],
                null,//'in_carts_num',
                null,//'sales_num_1d',

                null,//'sales_num',
                null,//'view_num_30d',
                null,//'favorites_num_30d',

                null,//'reviews_num_30d',
                null,//'rating_value_30d',
                null,//'sales_num_30d',

                listingImages.length > 0 ? listingImages : null,
                listingVideos.length > 0 ? listingVideos : null,
                isReturnNull(nowData.last_modified_timestamp)//int
            ]);
        }
    }
    console.log(2);
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
        pc1,video,modified_time)  VALUES ?  `;
        connection.query(stmt, [insertData],function (err, results,) {
            if(err){
                console.log(err);
            }else{
                console.log('2 Row inserted:' + results.affectedRows);
            }
        });
    }
}

//����listing_data��
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
                null,//'in_carts_num',
                null,//'sales_num_1d',

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
    console.log(3);
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
            }else{
                console.log('3 Row inserted:' + results.affectedRows);
            }
        });
    }
}

//�ж��ǲ���undefined undefined�򷵻�false �����򷵻�true
function isNotUndefined(temp) {
    return typeof temp !== 'undefined';
}

//�ж��ǲ���undefined �Ƿ���null  ���Ƿ��ص�ǰֵ
function isReturnNull(temp) {
    return typeof temp != 'undefined' ? temp : null;
}

//�ж��ǲ�������  ���ַ���true
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

//�ж��ǲ���Boolean �Ƿ���true
function isBoolean(bool) {
    return typeof bool === 'boolean';
}

//����ӿڷ��ص�ͼƬ
function handleListingsImages(images){
    let listingImages = [];
    for(let j = 0;j < images.length;j++){
        if(images[j].hasOwnProperty('url_fullxfull')) {
            listingImages.push(images[j].url_fullxfull);
        }
    }
    return listingImages;
}

//����ӿڷ��ص���Ƶ
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

//����ӿڷ��ص����� ��ȡ������ƽ������
function hanldeListingReviews(reviews){
    let temp = 0;
    for(let i = 0;i < reviews.results.length;i++){
        temp += isReturnNull(reviews.results[i].rating);
    }
    let rate = temp/reviews.count.toFixed(2);
    return [isReturnNull(reviews.count), isNumber(rate) ? rate : null];
}

//����ӿڷ��ص���Ʒ�����Ϣ
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

module.exports = {handleData};
