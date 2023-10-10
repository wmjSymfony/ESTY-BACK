##部署前需要修改三个地方：
####1）controller/handleDataController.js中的数据库密码 从123456 修改为服务器数据库密码
####2）server.js的端口号3000 改为 80
####3）backserver.js中的ip改为 http://xx.xx.xx.xx


##目录解释
####1）static 静态服务器，端口80。利用server.js开启。已设置服务器一直开启。
#####    暂时用jq（因为jq操作和访问dom非常简单），后续其他功能建议替换使用react或者vue。
####2）controller 后端功能。
#####    htmlcontroller爬取html，存储html，删除html
#####    listingController接口请求listing 和 reviews
#####    handledataController处理数据，操作数据，存储listing和reviews
####3）router 路由    
####4）backserver.js 后端服务开启
####5）server.js 前端服务开启

##代码使用方式
####1）拉取代码
####2）npm install 下载依赖文件

##特别注意
####1）仓库的node_modules不是最新的 请重新下载依赖文件
