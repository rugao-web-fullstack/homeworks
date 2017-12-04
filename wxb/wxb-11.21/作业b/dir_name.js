var debug = require('debug')('dir_name');

//---目录的递归读取
var fs = require('fs');
var path = require('path');

//---解析路径
var filePath = path.resolve('./../..');

//---文件遍历
function file(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      debug('log: '+err);
    } else {
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        fs.stat(filedir, function (err, stats) {
          if (err) {
            debug('log: '+err);
          } else {
            //---如果是文件夹则输出并继续往下遍历
            var isFile = stats.isFile();
            if (isFile) {
              debug('log: '+filename);
            }
            var isDir = stats.isDirectory();
            if (isDir) {
              debug('log: '+filedir);
              file(filedir);
            }
          }
        });
      });
    }
  });
}

file(filePath);