

$(function()
{
 
$('.username').keyup(function()
 {
   var username=$(this).val();
   username=trim(username);
  // if(username!=''){
  // $('.check').show();
  // $('.check').fadeIn(400).html
   //   ('<img src="image/ajax-loading.gif" />');
   var dataString = 'username='+ username;
   $.ajax({
      type: "POST",
      url: "a-checkUsername",
      data: dataString,
      cache: false,
      success: function(result){
      var result=trim(result);
     // if(result==''){
     //     $('.check').html(username+' Avaliable');
     //     $('#submit').attr('disabled', '');
     //     $('#submit').attr('value', 'Active');
     //     $(".username").removeClass("red");
     //     $(".username").addClass("white");
     // }else{
    //      $('.check').html(username+' '+result);
    //      $('#submit').attr('disabled', 'disabled');
    //      $('#submit').attr('value', 'Deactive');
    //      $(".username").removeClass("white");
     //     $(".username").addClass("red");
    //  }
    // }
  });
 //}else{
  //  $('.check').html('');
  //  $('#submit').attr('disabled', 'disabled');
  //  $('#submit').attr('value', 'Deactive');
 }
 });

});


function trim(str){
    var str=str.replace(/^\s+|\s+$/,'');
    return str;
}