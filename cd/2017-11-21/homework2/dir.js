var debug = require('debug')('xxx');
var fs = require('fs');  
var path = require('path');  
  
var filePath = path.resolve('..');  
  
fileDisplay(filePath);  
  
function fileDisplay(filePath){   
  fs.readdir(filePath,function(err,files){  
    if(err){  
      debug('warn:' +err);  
    }else{  
      files.forEach(function(filename){  
        var filedir = path.join(filePath,filename);   
        fs.stat(filedir,function(eror,stats){  
          if(eror){  
            debug('warn:' +'获取文件stats失败');  
          }else{  
            var isFile = stats.isFile();//是文件  
            var isDir = stats.isDirectory();//是文件夹  
            if(isFile){  
              debug('log:' +filedir);  
            }  
            if(isDir){  
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
            }  
          }  
        });  
      });  
    }  
  });  
}  