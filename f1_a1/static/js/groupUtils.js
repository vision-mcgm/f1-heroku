function aGetShortGroupsList(callback){

  $.ajax({
    url:"/getShortGroupList",
    data: {csrfmiddlewaretoken:getCookie('csrftoken')},
    dataType: "json",
    type: "GET",
    success:function(data){
      
      //var jsonData=JSON.parse(data);
      callback(data);
    },
    error:function(data){say('no');}
});
}

function fillAddIn(data){
  //alert('worra');
  for (var i=0;i<data.length;i++){
    str='<li class="bInG" data-groupname="'+data[i].groupName+'">'+data[i].groupName+'</li>';
    $('#inGAddList').append(str);

  }
  
}

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

function renderGroupsList(jList){
  say(jList);
  gGroupList=jList;
  //groupDAG=groupTreeToDAG(jList);
  for (var i=0;i<jList.length;i++){
   // str=jList[i].groupName +'<br />';
    div=groupListEntry(jList[i])
$('.leftGroupList').append(div);
  }
  
}

function loadGroupsList(){
aGetGroupsList();

}