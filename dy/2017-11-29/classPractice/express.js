/**
 * express 核心对象
 * 1、Application
 * 2、Router
 * 3、Request
 * 4、Response
 */
var debug = require('debug')('log');
var express = require('express');
var mid1 = require('./mid1');
var mid2 = require('./mid2');
var app = express();

// 中间件 --- 异步函数
/**
 * 注意事项：
 * 中间件是有顺序的
 * 中间件是线性的
 * 中间件优先于最终请求处理被执行
 */
app.use(mid1);
app.use(mid2);

// 路由
// app.get('/', index);
// app.get('/hello', hello);

app.get('/users/:id', function (req, res) {
  res.write('inside users');
  debug('log' + req.params);
  res.write('\n');
  res.write(req.mid + '\n');
  res.end();
});


app.listen(3000);