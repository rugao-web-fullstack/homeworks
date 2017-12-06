var debug = require('debug')('register');

$(function () {
  $('#register').on('click',function () {
    // // console.log($("#mail").val());
    $.ajax({
      type:'POST',
      url:'/register-add',
      dataType:'json',
      data:{'email':$('#mail').val(),'pwd':$('#pwd').val()},
      success:function () {
        debug('success');
      }
    });

  });
});