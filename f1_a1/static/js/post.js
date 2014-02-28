var outgroup='';


$(window).load(postInit);



function postInit(){

aGetShortGroupsList(fillAddIn);
$(document.body).on( "click", '.bInG', selectGroup);
$(document.body).on( "click", '#bPost', post);

}

//Click handlers

function post(event){
  say('post');
  postConverse(event);
}

function addToGroup(event){
	say($(event.target).data('groupname'));
	aAddToGroup($(event.target).data('groupname'),gCurrentPersonHandle);
}

function selectGroup(event){
  
  outgroup=$(event.target).data('groupname');
  $(event.target).closest('.sf-menu').hideSuperfishUl();
  say(outgroup);

}

//Other



//Callbacks for AJAX request

