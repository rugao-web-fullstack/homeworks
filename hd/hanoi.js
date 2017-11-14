
var num=parseInt(process.argv[2]);

function hanoi(num){
    move("1","3",num);
}

var step=0;

function move(start,end,move_num){
    if(move_num==1){
        console.log("第"+(++step)+"步 ",start,"---->",end);
    }else{
        var other="123".replace(start,"").replace(end,"");
        move(start,other,move_num-1);
        move(start,end,1);
        move(other,end,move_num-1);
    }
}

hanoi(num);

module.exports=hanoi;