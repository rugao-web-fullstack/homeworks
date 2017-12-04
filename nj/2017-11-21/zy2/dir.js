var debug = require('debug')('xxx');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve('..');

function fileDisplay(filePath) {
    fs.readdir(filePath, function(err, files) {
        if(err) {
            debug('warn:' + err);
        } else {
            files.forEach(function(filename) {
                var filedir = path.join(filePath, filename);
                fs.stat(filedir, function(error, stats) {
                    if(error) {
                        debug('log:' + '失败');
                    } else {
                        var isFile = stats.isFile(); //是文件  
                        var isDir = stats.isDirectory(); //是文件夹  
                        if(isFile) {
                            debug('log:' + '---文件： ' + filedir);
                        }
                        if(isDir) {
                            debug('log:' + '---目录名：' + filedir + '\n');
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }
                    }
                });
            });
        }
    });
}

fileDisplay(filePath);
