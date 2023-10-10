var listingidsTemp = [];
var listingids = [];
var listingsSales = {};//以上listing的加购数量 和 售卖数量
var ip = document.domain;
var port = location.port.length > 0 ? location.port : '80';

//并发爬取多个listing
async function getListings(){
    $("#text").text("");

    // 准备一个列队存放请求
    let queue = [];

    listingidsTemp = $("#listing-content").val().split(/,|，|\s+/);
    listingids = JSON.parse(JSON.stringify(listingidsTemp));

    // 循环推送请求到 queue 列队(如：idList = ['a', 'b', 'c'],则会同时发送3次请求)
    listingidsTemp.forEach(item => {
        queue.push(getSalenumHtml(item));
    })
    const res = await Promise.all(queue);//按顺序返回
    for(let i = 0;i < res.length;i++){
        if(res[i].status == 200){
            $("#listing-html").innerHTML = '';
            try {
                await loadHtml(i);
            }catch (e) {
                console.log(e);
            }
        }else{
            listingids.splice(listingids.indexOf(listingids[i]), 1);//返回值不为200，表示请求错误，删除这个id
            return;
        }
    }

    //给后端发送爬取到的数据
    console.log(listingids,listingsSales);
    saveData();
}

//通过listing获取返回的html
async function getSalenumHtml(listingid){
    return new Promise(function (resolve, reject) {
        fetch(
            'http://'+ip+':3001/gethtml?id=' + listingid).then(res => {
            resolve(res);
        }).catch(e => {
            reject(e);
        })
    })
}

//页面中加载html
async function loadHtml(i){
    return new Promise((resolve,reject) => {
        try{
            $("#listing-html").load('http://'+ip+':'+port+'/listing_'+listingidsTemp[i]+'.html',function (){
                getSalenum(listingidsTemp[i]);
                resolve();
            }).prop('async', false);
        }catch (e) {
            reject(e)
        }
    })
}

//从爬取到的html获取售卖量和加购量
function getSalenum(listingid){
    //表示这个商品id没有内容，不存在该页面等原因。则删除这个id
    if($('#listing-right-column').length <= 0){
        listingids.splice(listingids.indexOf(listingid), 1);
        // console.log(listingid,'no html');
        return;
    }

    //获取售卖量或者加购数
    let temp = $('#listing-page-cart  .wt-text-title-01.wt-text-brick').text().toLowerCase();
    // console.log('售卖量&加购数:',temp);
    listingsSales[listingid] = {
        in_cates_num: null,
        sales_num_1d: null,
        ships_from: null,
        ships_days_min: null,
        ships_days_max: null,
        cost_to_ship: null,
        skus: null,
        category: null,
        image: null,
        video: null,
    };
    let cartsIndex = temp.indexOf('carts');
    if(cartsIndex >= 0){
        let tempArr = temp.slice(0,cartsIndex).replace(/,/g,'').trim().split(" ");
        listingsSales[listingid]["in_carts_num"] = tempArr[tempArr.length - 1];
    }
    let sales_num_index = temp.indexOf('people bought');
    if(sales_num_index >= 0){
        let tempArr = temp.slice(0,sales_num_index).replace(/,/g,'').trim().split(" ");
        listingsSales[listingid]["sales_num_1d"] = tempArr[tempArr.length - 1];
    }
    getShips(listingid);
}

//从爬取的html获取ships_from、ships_days_min ships_days_max cost_to_ship category  sku images  videos 1062650938
function getShips(listingid){
    let cost_to_ship = $('#shipping-and-returns-div  .currency-symbol').text().toLowerCase().trim() + $('#shipping-and-returns-div .currency-value').text().toLowerCase().trim();
    listingsSales[listingid]["cost_to_ship"] = (cost_to_ship.length > 0 && cost_to_ship.toString()) || null;

    let ships_from = $('#shipping-and-returns-div .wt-grid__item-xs-12.wt-text-black.wt-text-caption.wt-mb-xs-4').text().trim().toLowerCase();
    if(ships_from.length > 11){
         listingsSales[listingid]["ships_from"] = ships_from.substr(11);
    }

    let deliveryDate = $('#shipping-and-returns-div ul li:first span[data-selector=popover-placeholder]').text().trim().toLowerCase();
    [listingsSales[listingid]["ships_days_min"],listingsSales[listingid]["ships_days_max"]] = getDeliveryDateMinMax(deliveryDate);

    // setTimeout(function () {
    //     let deliveryDate = $('#shipping-and-returns-div ul li:first button').text();
    //     console.log(deliveryDate);
    //     console.log(getDeliveryDateMinMax(deliveryDate));
    //     [listingsSales[listingid]["ships_days_min"],listingsSales[listingid]["ships_days_max"]] = getDeliveryDateMinMax(deliveryDate);
    //     console.log(listingsSales);
    // },2000)

    let categorysDom = $('#desktop-category-nav li');
    let cates = [];
    for(let i = 1;i < categorysDom.length;i++){
        let text = $(categorysDom[i]).find('a').text().trim().toLowerCase();
        text.length > 0 ? cates.push(text) : null;
    }
    listingsSales[listingid]["category"] = cates.length > 0 ? JSON.stringify(cates) : null;

    let skuSelectionDom = $("#listing-page-cart select");
    let skus = {};
    for(let i = 0;i < skuSelectionDom.length;i++){
        let arr = [];
        let indexSku = "";
        let skuOptionsDom = $(skuSelectionDom[i]).find('option');
        indexSku = $(skuOptionsDom[0]).text().trim().toLowerCase();
        for(let j = 1;j < skuOptionsDom.length;j++){
            let text = $(skuOptionsDom[j]).text().trim().toLowerCase();
            text.length > 0 ? arr.push(text) : null;
        }
        if(arr.length > 0){
            skus[indexSku] = arr;
        }
    }
    listingsSales[listingid]["skus"] = Object.keys(skus).length > 0 ? JSON.stringify(skus) : null;

    let imageulDom = $(".listing-page-image-carousel-component ul");
    if(imageulDom.length > 0){
        let imageDom = $(imageulDom[0]).find('li img');
        let arr = [];
        for(let i = 0;i < imageDom.length;i++){
            let src = $(imageDom[i]).attr('src');
            src.length > 0 ? arr.push(src) : null;
        }
        if(arr.length > 0){
            listingsSales[listingid]["image"] = JSON.stringify(arr);
        }
    }

    let videoDom = $(".listing-page-image-carousel-component video source");
    if(videoDom.length > 0){
        let arr = [];
        let src = $(videoDom).attr('src');
        src.length > 0 ? arr.push(src) : null;
        if(arr.length > 0){
            listingsSales[listingid]["video"] = JSON.stringify(arr);
        }
    }
}

// getDeliveryDateMinMax('Oct 30-Nov 17');
// 返回nov 19-20距离今天的时间
function getDeliveryDateMinMax(deliveryDate) {
    try{
        let date = new Date();
        if(deliveryDate.length <= 0){
            return [null,null];
        }
        let arr = deliveryDate.replace(/-/g,' ').toLowerCase().trim().split(' ');
        if(arr.length == 3){
            let temp = arr[2];
            arr.pop();
            arr.push(arr[0],temp);
        }
        const mounthEng = {
            'jan':1,
            'feb':2,
            'mar':3,
            'apr':4,
            'may':5,
            'jun':6,
            'jul':7,
            'aug':8,
            'sept':9,
            'oct':10,
            'nov':11,
            'dec':12,
        }
        let month = date.getMonth() + 1;
        let max = 0;
        let min = 0;
        if(mounthEng.hasOwnProperty(arr[0])){
            if(mounthEng[arr[0]] - month >= 0){
                min += (mounthEng[arr[0]] - month) * 30;//默认一个月有30天
            }else{
                min += Math.abs(mounthEng[arr[0]] + 12 - month) * 30;//默认一个月有30天
            }
        }
        if(mounthEng.hasOwnProperty(arr[2])){
            if(mounthEng[arr[0]] - month >= 0){
                max += (mounthEng[arr[2]] - month) * 30;//默认一个月有30天
            }else{
                max += Math.abs(mounthEng[arr[0]] + 12 - month) * 30;//默认一个月有30天
            }
        }
        min += arr[1] - date.getDate();
        max += arr[3] - date.getDate();
        isNumber(min) ? min : null;
        isNumber(max) ? max : null;
        return [min.toString(),max.toString()];
    }catch(e){
        console.log(e);
        return [null,null];
    }
}

//判断是不是数字  数字返回true
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

//给服务端发送数据
function saveData() {
    return new Promise(function (resolve, reject) {
        fetch('http://'+ip+':3001/gethtml/saveListingHtmlData',{
            method: 'post',
            body: JSON.stringify({
                id: listingids,
                sales: listingsSales
            }),
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response,response.status)
            if(response.status == 200){
                $("#text").text(response.data);
            }else if(response.status == -1){
                $("#text").text(response.data);
            }else{
                $("#text").text('未知错误');
            }
        })
    })
}
