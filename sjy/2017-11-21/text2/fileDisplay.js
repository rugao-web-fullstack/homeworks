var debug = require('debug')('xxx');
const fs = require('fs');
const path = require('path');
function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      debug('warn:' + err);
    } else {
      files.forEach(function (filename) {
        var filedir = path.join(filePath, filename);
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            debug('warn' + '获取文件stats失败');
          } else {
            var isDir = stats.isDirectory();
            debug('log' + filedir);
            if (isDir) {
              fileDisplay(filedir);
            }
          }
        });
      });
    }
  });
}
exports.fileDisplay = fileDisplay;
