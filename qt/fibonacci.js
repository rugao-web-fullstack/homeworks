var num = parseInt(process.argv[2]);
function fibonacci(num){
    var first = 0;
    var second = 1;
    var sum = 1;
    for(var i=0;i<num;i++){
        console.log(sum);
        sum = first+second;
        first=second;
        second=sum;
    }
}
fibonacci(num);
module.exports=fibonacci;