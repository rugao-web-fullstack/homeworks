module.exports = function hnt(n,a,b,c){
     var re = /^[0-9]+$/;
      if(re.test(n)){
          if(n>0){
             hnt(n-1,a,c,b);
             console.log("move: "+n+" from: "+a+" to: "+c+"\n");
             hnt(n-1,b,a,c);
          }
      }else{
         console.log("the number is not true");  
    }
}