var debug = require('debug')('log');
function Teacher(event,name) {
  this.event = event;
  this.name = name;
  this.count = 0;
  this.event.on('ring', () => {
    if(this.count % 10 === 9){
      this.event.once('ring', () => {
        this.response();
      });
    }
    this.count++;
  });
}
Teacher.prototype.response = function () {
  debug('log:' + 'teacher<' + this.name +'>response');
};
exports.Teacher = Teacher;
