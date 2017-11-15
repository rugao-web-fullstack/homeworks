var arr = [];
function hunt(n){
    hnt(n,"a","b","c");
    return arr;
}
function hnt(n,a,b,c){
    if(n===1){
        arr.push("Move "+n+" from "+a+" to "+c);
    }else{
        hnt(n-1,a,c,b);
        arr.push("Move "+n+" from "+a+" to "+c);
        hnt(n-1,b,a,c);
    }
}
module.exports = hunt;
