
var num=parseInt(process.argv[2]);

function fibonacci(num){
    var firstNum=0;
    var secondNum=1;
    var sum=1;
    for(var i=0;i<num;i++){
        console.log(sum);
        sum=firstNum+secondNum;
        firstNum=secondNum;
        secondNum=sum;
    }
}

fibonacci(num);

module.exports=fibonacci;