$(window).load(personInit);



function personInit(){

aGetShortGroupsList(fillAddIn);
$(document.body).on( "click", '.bInG', addToGroup);
getStartMessages();
}

//Click handlers

function addToGroup(event){
	say($(event.target).data('groupname'));
	aAddToGroup($(event.target).data('groupname'),gCurrentPersonHandle);
}

//Other


function fillAddIn(data){
	//alert('worra');
	for (var i=0;i<data.length;i++){
		str='<li class="bInG" data-groupname="'+data[i].groupName+'">'+data[i].groupName+'</li>';
		$('#inGAddList').append(str);

	}
	
}

//Callbacks for AJAX request

function addedOK(data){
	say('added ok');
}

//AJAX requests

function aAddToGroup(groupName,handleToAdd){
  $.ajax({
    url:"/addToGroup",
    data: {csrfmiddlewaretoken:getCookie('csrftoken'),
      groupName:groupName,
      handleToAdd:handleToAdd},
    dataType: "json",
    type: "GET",
    success:function(data){
      
      //var jsonData=JSON.parse(data);
      addedOK(data);
    },
    error:function(data){say('no');}
});
}