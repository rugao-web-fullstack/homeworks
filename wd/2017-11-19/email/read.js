function Read(client, dlArr, Message) {
  client.on('read', function () {
    for (let i = 0; i < Message.length; i++) {
      if (Message[i][0] === dlArr[0]) {
        client.write('正文-----' + Message[i][1] + '------来自----' + Message[i][2]+'\n');
      }
    }
    client.emit('menu');
  });
}
exports.Read = Read;
