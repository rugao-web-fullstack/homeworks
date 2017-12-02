$(function(){
    $('#mailnav a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $(".showmail").click(function(){
        $("#mailContent").html($(this).attr("data-content"));
    })
    if($("#message").text()){
        $("#message").show();
    }else{
        $("#message").hide();
    }
})