var debug = require('debug')('xxx');
const fs = require("fs");
const path = require("path");
//fs.mkdirSync("tmp");


function tranverse(dirname) {
    const dirbase = path.dirname(path.resolve(dirname));
    const dir = fs.readdirSync(dirname);
    debug("log:" +"directories contains " + dir);
    for (let i = 0; i < dir.length; i++) {

        let filename = path.resolve(dirname, dir[i]);

        let stats = fs.statSync(filename);
        if (stats.isDirectory()) {
            debug("log:" +"dirname = " + filename);
            tranverse(filename);
            continue;
        }
        debug("log:" +"filename = " + filename);
    }
}
let filename = path.dirname(path.resolve("."));
tranverse(filename);
