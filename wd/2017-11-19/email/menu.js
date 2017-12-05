function Menu(client) {
  client.on('menu', function () {
    client.write('write : 写 邮 件\nread : 读 邮 件\n');
    client.on('data', function you(data) {
      if (data.toString().split('\r\n')[0] === 'write') {
        client.removeListener('data', you);
        client.emit('write');
      }
      if (data.toString().split('\r\n')[0] === 'read') {
        client.removeListener('data', you);
        client.emit('read');
      }
    });

  });
}
exports.Menu = Menu;
