var fs = require("fs");


function walk(dir) {
    var children = [];
    fs.readdirSync(dir).forEach(function (filename) {
        var path = dir + "/" + filename;
        var stat = fs.statSync(path);
        if (stat && stat.isDirectory()) {
            children = children.concat(walk(path));//concat链接+
        }
        else {
            children.push(path);
        }
    });

    return children;
}

var path = walk('d1');
console.log(path);

