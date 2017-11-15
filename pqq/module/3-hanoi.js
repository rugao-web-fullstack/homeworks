function hanoi(n,a,b,c){
    if(n===1){
        console.log("移动： "+n+"  从 "+a+" 到 "+c);
    }
    else{
        hanoi(n-1,a,c,b);
        console.log("移动： "+n+"  从 "+a+" 到 "+c);
        hanoi(n-1,b,a,c);
    }
}
module.exports.hanoi = hanoi;