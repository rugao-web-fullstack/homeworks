function WriteHead(client, zcArr, dlArr, Message, clientList) {
  client.on('write', function () {
    client.write('请 输 入 如 下 收 信 人 ：\n');
    for (let i = 0; i < zcArr.length; i++) {
      for(let j =0; j<clientList.length; j++){
        if(zcArr[i][2]===clientList[j]){
          client.write(i + ' : ' + zcArr[i][0] + '\n');
        }
      }
    }
    let Arr = [];
    client.on('data', function xie(data) {
      for (let i = 0; i < zcArr.length; i++) {
        if (zcArr[i][0] === data.toString().split('\r\n')[0]) {
          Arr.push(data.toString().split('\r\n')[0]);
          client.removeListener('data', xie);
          client.emit('writeb', Arr, i);
          return;
        }
      }
      client.write('没 有 该 用  户 ！ 请 重 新 输  入 ！  \n');
      client.removeListener('data', xie);
      client.emit('menu');


    });
  });
}
exports.WriteHead = WriteHead;
