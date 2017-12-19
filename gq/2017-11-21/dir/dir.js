var debug = require('debug')('gq');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);
//以root目录为例
readDir(path.join(root));
function readDir(path) {
  fs.readdir(path, function (err, menu) {
    if (!menu)

      return;
    menu.forEach(function (ele) {
      fs.stat(path + '/' + ele, function (err, info) {
        if (info.isDirectory()) {
          debug('dir: ' + ele);
          readDir(path + '/' + ele);
        } else {
          debug('file: ' + ele);
        }
      });
    });
  });
} 
