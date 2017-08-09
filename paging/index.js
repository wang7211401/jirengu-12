var http = require('http');
var fs = require('fs');
var url = require('url');

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

    var temp = url.parse(request.url, true);
    var path = temp.pathname;
    var query = temp.query;
    var method = request.method;

    //从这里开始看，上面不要看

    if(path === '/'){  // 如果用户请求的是 / 路径
        var string = fs.readFileSync('./index.html', 'utf8');
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        let result = '';
        if(query.page === '1' || query.page === undefined){
            result = string.replace('{{xxx}}','1,2,3,4,5,6,7,8,9,10')
        }else if(query.page === '2'){
            result = string.replace('{{xxx}}','11,12,13,14,15,16,17,18,19,20')
        }else if(query.page === '3'){
            result = string.replace('{{xxx}}','21,22,23,24,25,26,27,28,29,30')
        }
        result = result.replace('{{pageCount}}',3);
        result = result.replace('{{page}}',query.page);
        response.end(result)
    }else if(path === '/style.css'){
        var string = fs.readFileSync('./style.css');
        response.setHeader('Content-Type', 'text/css');
        response.end(string)
    }else if(path === '/main.js'){
        var string = fs.readFileSync('./main.js');
        response.setHeader('Content-Type', 'application/javascript');
        response.end(string)
    }else{
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end('找不到对应的路径，你需要自行修改 index.js')
    }

    // 代码结束，下面不要看
    console.log(method + ' ' + request.url)
});

server.listen(port);
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port);