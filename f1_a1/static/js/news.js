
//Variables

var gGroupList=[];

$(window).load(initNews);
  //$(window).on("load resize", fxInit);

  function initNews()
{
//$(document.body).on('keyup','#tfNewG', rNewGroup);
$(document.body).on( "click", '.groupListEntry', loadGroupConvos);
 // reInitVars;
loadGroupsList();

}

//Button handlers

function loadGroupConvos(event){
  say('load');
  aFetchGroupConvos(event);
}

function aFetchGroupConvos(event){
  groupHandle=$(event.target).closest('div').data('groupname');
  $.ajax({
    url:"/fetchGroupConvos",
    data: {csrfmiddlewaretoken:getCookie('csrftoken'),
    groupHandle:groupHandle},
    dataType: "json",
    type: "GET",
    success:function(data){
      
      //var jsonData=JSON.parse(data);
      drawConvos(data);
    },
    error:function(data){say('no');}
});
}

