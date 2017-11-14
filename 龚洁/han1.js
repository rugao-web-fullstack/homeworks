//汉诺塔

function han(num,a,b,c) {
    if(num==1) {
        console.log("Move " + num + ' form ' + a + ' to ' + c);
    }
    else {
        han(num-1,a,c,b);
        console.log("Move " + num + ' form ' + a + ' to ' + c);
        han(num-1,b,a,c);
    }
}
exports.han1=han;