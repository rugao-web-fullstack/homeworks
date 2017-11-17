const EventEmitter = require('events');
const Student = require("./student").Student;
const Teacher = require("./teacher").Teacher;
const emitter = new EventEmitter();
const userMax = 1;
const teacherMax = 1;
// All sockets connections
let students = [];
let teachers = [];
for(let i = 0; i < userMax; i++) {
	students.push(new Student(emitter, 
		"user" + i));
}
for(let i = 0; i < teacherMax; i++) {
	teachers.push(new Teacher(emitter, 
		"teacher" + i));
}

setInterval(() => {
	emitter.emit("ring");
}, 200);
