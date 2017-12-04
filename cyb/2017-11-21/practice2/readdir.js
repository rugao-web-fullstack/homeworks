var debug = require('debug')('xxx');
var fs = require('fs');
var path = require('path');

var filePath = path.resolve('..');
//把一个路径或者路径片段解析成一个绝对路径，返回解析后的路径字符串
FileDisplay(filePath);
function FileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      debug('warn:' + err);
    } else {
      files.forEach(function (filename) {
        var dir = path.join(filePath, filename);
        fs.stat(dir, function (error, stats) {//获取文件信息
          if (error) {
            debug('warn:' + '获取失败。。。');
          } else {//判断是文件还是目录
            var isFile = stats.isFile();
            var isDirectory = stats.isDirectory();
            if (isFile) {
              debug('log:' + dir);
            }
            if (isDirectory) {
              FileDisplay(dir);
            }
          }
        });
      });
    }
  });
}
