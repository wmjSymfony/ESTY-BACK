const fetch = require("node-fetch");
const fs = require('fs');

//通过listing获取并存储html
async function htmlController(listingid){
    return new Promise(function (resolve, reject) {
        fetch('https://www.etsy.com/listing/' + listingid + '.html')
            .then(result => {
                return result.text();
            })
            .then(res => {
                res = res.replace(/(<!--.*?-->)|(<(meta|link).*?>)/g, '')
                res = res.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")
                fs.writeFile('./static/listing_' + listingid + '.html', res, err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    resolve({'status':'200'});
                });
            })
        }).catch(e => {
            return ({'status':'-1',data:e});
        })
}

// deleteHtml([1,2,3,1062650938]);
//通过listing删除html
async function deleteHtml(listingids){
    for(let i = 0;i < listingids.length;i++) {
        // console.log(listingids[i]);
        await new Promise((resolve, reject) => {
            fs.unlink('./static/listing_' + listingids[i] + '.html', (err) => {
                if (err) reject(err);
                resolve('成功删除'+listingids[i]);
            });
        }).catch(e => {
            console.log('错误',e)
        })
    }
}

module.exports =  {htmlController,deleteHtml}
