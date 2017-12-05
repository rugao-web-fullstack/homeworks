var debug = require('debug')('log');
function Student(event,name) {
  this.event = event;
  this.name = name;
  this.event.on('ring', () => {
    this.response();
  });
}
Student.prototype.response = function () {
  debug('log:' + 'student<' + this.name +'>response');
};
exports.Student = Student;
