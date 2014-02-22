$(window).load(initGroups);
  //$(window).on("load resize", fxInit);

  function initGroups()
{
 // reInitVars;
loadGroupsList();
}

function loadGroupsList(){
aGetGroupsList();

}

//Helper functions

function renderGroupsList(jList){
  say(jList);
  $('.leftGroupList').html(jList);
}

//AJAX requests

function aGetGroupsList(){
  $.ajax({
    url:"/getGroups",
    data: {csrfmiddlewaretoken:getCookie('csrftoken')},
    dataType: "json",
    type: "GET",
    success:function(data){
      
      //var jsonData=JSON.parse(data);
      renderGroupsList(data);
    },
    error:function(data){say('no');}
});
}