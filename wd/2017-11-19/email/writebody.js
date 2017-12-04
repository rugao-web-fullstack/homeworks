function WriteBody(client, dlArr, Message, zcArr) {
  client.on('writeb', function (Arr, i) {
    client.write('请 输 入 正 文 ：\n');
    client.on('data', function zhen(data) {
      Arr.push(data.toString().split('\r\n')[0]);
      Arr.push(dlArr[0]);
      Message.push(Arr);
      zcArr[i][2].write('-----------您有一封新邮件！请注意查收！---------\n');
      client.write('已 发 送 ！\n');
      client.removeListener('data', zhen);
      client.emit('menu');
    });

  });
}
exports.WriteBody = WriteBody;
