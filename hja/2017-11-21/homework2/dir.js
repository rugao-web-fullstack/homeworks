var fs = require('fs');
var path = require('path');
var debug = require('debug')('dir');


var filePath = path.resolve('./../');



function file(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      // console.warn(err);
    } else {
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedirname = path.join(filePath, filename);
        fs.stat(filedirname, function (err, stats) {
          if (err) {
            // console.warn(err);
          } else {
            var isDir = stats.isDirectory();
            if (isDir) {
              // console.log(filedirname);
              debug(filedirname);
              file(filedirname);
            }
          }
        });
      });
    }
  });
}

file(filePath);