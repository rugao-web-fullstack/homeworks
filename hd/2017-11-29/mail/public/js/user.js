$(function () {
    $('#mailnav a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $(".showmail").click(function () {
        $("#mailContent").html($(this).attr("data-content"));
    })
    if ($("#message").text()) {
        $("#message").show();
        setTimeout(function () {
            $("#message").fadeOut(1500, "linear");
        }, 3000);
    }
})