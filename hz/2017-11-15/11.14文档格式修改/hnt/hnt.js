function hnt(n, a, b, c){
    if(n===1){
        console.log("Move "+ n +" from "+ a +" to "+ c );
    }else{
        hnt(n-1, a, c, b);
        console.log("Move "+ n +" from "+ a +" to "+ c );
        hnt(n-1, b, a, c);
    }
}
module.exports = hnt;
