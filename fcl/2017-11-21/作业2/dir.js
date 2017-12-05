var fs = require('fs');
var path = require('path');
var debug = require('debug')('log');
var filePath = path.resolve('../');

function file(filePath) {
  fs.readdir(filePath, function(err, files) {
    if (err) {
      debug('warn:' + err);
    } else {
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        fs.stat(filedir, function(err, stats) {
          if (err) {
            return;
          } else {
            var isDir = stats.isDirectory();
            if (isDir) {
              debug('log:' + filedir);
              file(filedir);
            }
          }
        });
      });
    }
  });
}

file(filePath);
