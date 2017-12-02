$(function(){
    $('#mailnav a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $(".showmail").click(function(){
        $("#mailContent").html($(this).attr("data-content"));
    })
})