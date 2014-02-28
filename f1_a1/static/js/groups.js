
//Variables

var gGroupList=[];

$(window).load(initGroups);
  //$(window).on("load resize", fxInit);

  function initGroups()
{
$(document.body).on('keyup','#tfNewG', rNewGroup);
 // reInitVars;
loadGroupsList();
$('#bNewGroup').click(newGroup);
$(document.body).on( "click", '#bSubNewGroup', subNewGroup);
$(document.body).on( "click", '.groupListEntry', selectGroup);
}



//Button handlers

function selectGroup(event){
  
  groupName=$(event.target).data('groupname');
  group=getGroupByName(groupName);
  say(groupName);
  for (var i=0;i<group.people.length;i++){
      div=personEntry(group.people[i].name);
      $('.leftGroupList').append(div);
    }
}

function newGroup(){
  say('new group');
  $('#newGroupContainer').html('Make a new group called: <input type="text" name="handle" class="username" id="tfNewG"><input class="button" type="submit" value="Create" id="bSubNewGroup"/>');
  aNewGroup();
}

function subNewGroup(event){
  say('yo');
  td=$(event.target).closest('td');
  groupName=td.find('.username').val();
  aNewGroup(groupName);
}

//Keypress handlers

function rNewGroup(event){
  say('k');
  if(event.keyCode == 13){
  subNewGroup(event);
}
}



//Drawing functions

function renderNewGroup(data){
loadGroups
}



//Helper functions

function getGroupByName(groupName){
  for (var i=0;i<gGroupList.length;i++){
    if (gGroupList[i].groupName==groupName){
      return gGroupList[i];
    }
  }
}


//AJAX requests

function aNewGroup(groupName){
  $.ajax({
    url:"/newGroup",
    data: {csrfmiddlewaretoken:getCookie('csrftoken'),
    groupName:groupName},
    dataType: "json",
    type: "GET",
    success:function(data){
      
      //var jsonData=JSON.parse(data);
      renderNewGroup(data);
    },
    error:function(data){say('no');}
});
}


