var debug = require('debug')('log');
var fs = require('fs');
var path = require('path');


var filePath = path.resolve('./../');



function file(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      // console.warn(err);
      debug('log : ' + err);
    } else {
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedirname = path.join(filePath, filename);
        fs.stat(filedirname, function (err, stats) {
          if (err) {
            // console.warn(err);
            debug('log : ' + err);
          } else {
            var isDir = stats.isDirectory();
            if (isDir) {
              // console.log(filedirname);
              debug('log : ' + filedirname);
              file(filedirname);
            }
          }
        });
      });
    }
  });
}

file(filePath);