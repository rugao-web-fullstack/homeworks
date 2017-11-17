function Student(event,name) {
	this.event = event;
        this.name = name;
	console.log("student: constructor");
        this.event.on("ring", () => {
              this.response()
        })
}
Student.prototype.response = function () {
	console.log("student<" + this.name +">response");
};
exports.Student = Student;
