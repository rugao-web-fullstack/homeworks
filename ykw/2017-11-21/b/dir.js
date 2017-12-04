var fs = require('fs');
var path = require('path');
var filePath = path.resolve('./../');
var debug = require('debug')('log');

function file(filePath) {
  fs.readdir(filePath, function (error, files) {
    if (error) {
      debug('log'+error);
    } else {
      files.forEach(function (filename) {
        var filedirname = path.join(filePath, filename);
        fs.stat(filedirname, function (error, stats) {
          if (error) {
            debug('log'+error);
          } else {
            var isDir = stats.isDirectory(); //文件夹
            var isFile = stats.isFile();  //文件
            if (isDir) {
              debug('log'+filedirname);
              //console.log(filedirname);
              file(filedirname);
            }
            if(isFile){
              debug('log'+filedirname);
              //debug.log(filedirname);
            }
          }
        });
      });
    }
  });
}

file(filePath);