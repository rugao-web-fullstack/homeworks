const fs = require('fs');
const path = require('path');
var debug = require('debug')('ago');
//fs.mkdirSync("tmp");


function tranverse(dirname) {
    const dirbase = path.dirname(path.resolve(dirname));
    const dir = fs.readdirSync(dirname);
    debug('info: '+dirbase);
    debug('directories contains ' + dir);
    for (let i = 0; i < dir.length; i++) {

        let filename = path.resolve(dirname, dir[i]);

        let stats = fs.statSync(filename);
        if (stats.isDirectory()) {
            debug('dirname = ' + filename);
            tranverse(filename);
            continue;
        }
        debug('filename = ' + filename);
    }
}
let filename = path.dirname(path.resolve('.'));
tranverse(filename);
