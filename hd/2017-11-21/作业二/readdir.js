const fs = require("fs");
const path = require("path");

const dirName = path.join(__dirname,"dir");

function tranverse(dirname){
    const dir = fs.readdirSync(dirname);
    for (let i = 0;i<dir.length;i++){
        let filename = path.join(dirname,dir[i]);
        let stats = fs.statSync(filename);
        if(stats.isDirectory()){
            tranverse(filename);
        }else{
            console.log(filename);
        }
    }
}

tranverse(dirName);