const fs = require("fs");
const path = require("path");

const root = path.join(__dirname)
//以root目录为例
readDir(path.join(root))
function readDir(path) {
    fs.readdir(path, function (err, menu) {
        if (!menu)

            return;
        menu.forEach(function (ele) {
            fs.stat(path + "/" + ele, function (err, info) {
                if (info.isDirectory()) {
                    console.log("dir: " + ele)
                    readDir(path + "/" + ele);
                } else {
                    console.log("file: " + ele)
                }
            })
        })
    })
}; 
