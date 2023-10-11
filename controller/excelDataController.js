//引入mysql
const mysqlpromise = require("mysql2/promise");
const config = require("../config/config");
var xlsx = require('node-xlsx').default;
const fs = require('fs');

var connectionpromise;
async function DB() {
    connectionpromise = await mysqlpromise.createConnection({
        host: 'localhost', //数据库地址
        port: '3306',//端口号
        user: 'root',//用户名
        password: config.password,//密码
        database: 'esty',//数据库名称
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

async function excelDataController(count,id,listingids){
    try {
        await DB();
        count = count || 1000;
        let stmtselect = `select * from listing_info where 1=1`;
        if(id){
            stmtselect += ' and id > ' + mysqlpromise.escape(Number(id));
        }
        if(listingids){
            let listingidArr = listingids.split(/,|，|\s+/);
            stmtselect += ' and ( listing_id = ';
            for(let i = 0;i < listingidArr.length;i++){
                stmtselect += listingidArr[i];
                stmtselect += (i != listingidArr.length - 1) ? ' or listing_id = ' : ' )';
            }
        }
        stmtselect += ` limit ` + mysqlpromise.escape(Number(count));
        const [rows, fields] = await connectionpromise.query(stmtselect);
        let data = [];
        if(rows.length > 0){
            data.push(Object.keys(rows[0]))
            for(let i = 0;i < rows.length;i++){
                data.push(Object.values(rows[i]));
            }
            let time;
            time = await createExcel(data);
            return {status:200,data:rows,time:time};
        }else{
            return {status:200,data:'no data'};
        }

    }catch (e) {
        console.log(e);
        return {status:'-1',data:e}
    }
}

async function createExcel(rows){
    var buffer = xlsx.build([{data: rows}]);
    let dateTime = new Date().getTime();
    var filePath =  `./static/excel/${dateTime}.xlsx`; // 存储路劲和文件名
    fs.writeFileSync(filePath,buffer,{'flag':'w'});
    return dateTime;
}

module.exports = {excelDataController};
