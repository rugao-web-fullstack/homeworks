$(function () {
    var li = document.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        li[i].onclick=function () {
            console.log(this.innerHTML.split(" "));
            alert("Mail\n\n"
                + "============================================\n\n"
                +"Mail---id: "+this.innerHTML.split(" ")[2]+"\n============================================\n\n"
                +"Mail---sender: "+this.innerHTML.split(" ")[4]+"\n============================================\n\n"
                +"Mail---receiver: "+this.innerHTML.split(" ")[6]+"\n============================================\n\n"
                +"Mail---title: "+this.innerHTML.split(" ")[8]+"\n============================================\n\n"
                +"Mail---content: "+this.innerHTML.split(" ")[10]);
        }
    }
});