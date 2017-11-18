function Teacher(event,name) {
	this.event = event;
        this.name = name;
        this.count = 0;
	console.log("teacher: constructor");
        this.event.on("ring", () => {
              if(this.count % 10 === 9){
                   this.event.once("ring", () => {
                        this.response();
                   });
              }
              this.count++;
        })
}
Teacher.prototype.response = function () {
	console.log("teacher<" + this.name +">response");
};
exports.Teacher = Teacher;
