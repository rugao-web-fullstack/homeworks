var debug = require('debug')('a');
module.exports = function(){
  var lineNumber=10;
  var array = new Array(lineNumber);
  for(var k=0;k<lineNumber;k++){
    array[k] = new Array();
  }
  var type = '';
  for(var i=0;i<lineNumber;i++){
    for(var j=0;j<=i;j++){
      //每一行首尾两个元素赋值为1
      if(0 == j || i == j){
        array[i][j] = 1;
        type+=array[i][j]+' ';
      }
      //其他元素为上一行前一列元素上一行这一列元素
      else {
        array[i][j] = array[i-1][j-1] + array[i-1][j];

        type+=array[i][j]+' ';
      }

    }
    type+='<br/>';
  }
  debug(type);
};
