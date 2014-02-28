//Variables
var xcount=10;
var ycount=10;
var dy=10;
var dx=10;
var startx=15;
var starty=7;
var hConvoAddingTo;
var maxRow=0;
var maxCol=0;
var maxHeightsByDepth=new Array();
maxHeightsByDepth[0]=0;
maxHeightsByDepth[1]=0;
maxHeightsByDepth[2]=0;
maxHeightsByDepth[3]=0;
maxHeightsByDepth[4]=0;
var barY=0;
var msgWidth=210;
var convoHolderYBuffer=10;
var msgBorder=1;

//Complex vars
var dictNodes=new Object();
var dictConvoRoots=new Object();
var dictConvoBoxes=new Object();
var nodeTree;
var boxToDrawReply;
var handleToDrawReply;
var nodeToDrawReply;

//HACK
gCurrentPersonHandle='';
gCurrentPersonUID='';


//DocumentReady handlers
//$(function()
$(window).load(fxInit);
  //$(window).on("load resize", fxInit);

  function fxInit()
{
 // reInitVars;
  console.log('Document ready!')
  xcount=10;
  ycount=10;

$('#startConv').click(addConvo);
//Handlers:
 //$(document.body).on( "click", '.test', reply);
 //$(document.body).on( "click", '.bPostNewConvo', postNewConvo); //Old?
$(document.body).on( "click", '.replylink', prepReply2);
$(document.body).on( "click", '.submitlink', sendReply);
$(document.body).on( "click", '.converselink', sendConverse);
//$(document.body).on( "click", '.converselink', startNewConvo);
 var csrf_token = getCookie('csrftoken');
 //$('#box-convo').append(newConvo());
 
 $('#convoHolder').css("height", "500px");
}

//Click handlers

function postConverse(event){
  console.log('new convo');
  msg=$(event.target).closest('table').find('textarea');
  //convoID=$(event.target).closest('.convoBox').data('convoID');
  text=msg.val();
  say(text);
   // msgID=msg.data('id');
  //console.log('id '+msgID);
  say(text);
  $.ajax({
    url:"/postConvo",
    data: {type:'wall',csrfmiddlewaretoken:getCookie('csrftoken'),
    text:text},
    dataType: "html",
    type: "GET",
    success:successConverse,
    error:function(data){say('no');}

});
}


function prepReply(event){
  say('Reply prepped.');
  parentMsg=$(event.target).closest('.floatmsg');
  x=parentMsg.data('x')+parentMsg.width()+dx;
  id=parentMsg.data('id');
  y=$(event.target).closest('.floatmsg').data('y');
  hConvo=$(event.target).closest('.convoBox');
  drawReplyPrep(hConvo,id,x,y);
}

function prepReply2(event){
  //Append reply to the node tree
  say('reply prepped');
  id=$(event.target).closest('.floatmsg').data('id');
  thisNode=dictNodes[id];
  var newNode=new Object();
  //newNode.text='harrr';
  newNode.handle=gHandle;
  newNode.name=gName;
  newNode.id=-1; //minus 1 if it's a reply
  newNode.replyTo=id;
  newNode.children=[];
  thisNode.children.push(newNode);
  thisConvoRoot=dictConvoRoots[id];
  thisConvoHandle=$(event.target).closest('.convoBox');
  thisConvoHandle.empty();
  drawConvoNode(thisConvoRoot,thisConvoHandle);

}


function addConvo(){
  say('New convo');
  var newConvo=$(convoBox());
  $('#convoShelf').append(newConvo);
  newMsg=$(floatconversexy(startx,starty,'new!','myname'));
  newConvo.append(newMsg);
  newConvo.height(newMsg.height()+starty+10);
  //drawReply(100,100,'yo');
  //$('#convoHolder').append(newConvo());
  //qNewConvo();

}

//



function successConverse(data){
  say(data);
}

function postMessage(){
$.ajax({
    url:"/converse",
    data: {type:'beavers',csrfmiddlewaretoken:getCookie('csrftoken') },
    dataType: "html",
    type: "GET",
    success:function(data){say(data);},
    error:function(data){say('no');}

});
}

//Tree building functions

function jsonMsgListToTree(msgList){
  //Takes JSON-converted data for one convo
  //This can be heavily optimised
  var success=0;
  var msgTree=new Object();
  var iterations=0;
while (msgList.length){
  iterations++;
  //for (var h=0;h<10;h++){
  //console.log('going round '+String(msgList.length));
  for (var i=0;i<msgList.length;i++){
   // console.log(msgList[i]);
    msg=msgList[i];
    if (msg.parent==0){
      //Root node
      msgTree.text=msg.text;
      msgTree.name=msg.name;
      msgTree.handle=msg.handle;
      msgTree.id=msg.id;
      msgTree.children=[];
      msgList.splice(i,1);//Remove element
      dictNodes[msg.id]=msgTree;
      dictConvoRoots[msg.id]=msgTree;

    }
    else{
      if (typeof msgTree.children != 'undefined'){
    success=tryToAdd(msgList[i],msgTree,msgTree);
    if (success){
      msgList.splice(i,1);
    }
      }
  }
  }
}
console.log(String(iterations)+' iterations');
return msgTree;
}

function tryToAdd(data,node,root){
  //Tries to add a node to a tree - RECURSIVE
var success=0;
if (node.id==data.parent){
  var newNode=new Object();
      newNode.text=msg.text;
      newNode.name=msg.name;
      newNode.handle=msg.handle;
      newNode.id=msg.id;
      newNode.children=[];
  node.children.push(newNode);
  dictNodes[msg.id]=newNode;
  dictConvoRoots[msg.id]=root;
  return 1;
}
for (var i=0;i<node.children.length;i++){
  success=tryToAdd(data,node.children[i],root);
  if (success) return 1;
}
}

//HL page drawing

function drawConvoJSON(convo)
{

  hConvoAddingTo=$(convoBox(convo.convoID));
  $('#convoShelf').append(hConvoAddingTo);
  convoTree=jsonMsgListToTree(convo.msgs);


  //MESSY - need to init levels better
  maxRow=0;
  barY=0;
  maxHeightsByDepth[0]=0;
  maxHeightsByDepth[1]=0;
  maxHeightsByDepth[2]=0;
  maxHeightsByDepth[3]=0;
  maxHeightsByDepth[4]=0;
  console.log('CONVO START');
  drawMsgsTree(convoTree); 
}

function drawConvoNode(node,convoHandle){
  //MESSY - need to init levels better
  hConvoAddingTo=convoHandle;
  maxRow=0;
  barY=0;
  maxHeightsByDepth[0]=0;
  maxHeightsByDepth[1]=0;
  maxHeightsByDepth[2]=0;
  maxHeightsByDepth[3]=0;
  maxHeightsByDepth[4]=0;
  drawMsgsTree(node); 
}

function drawMsgs(data){
  //Takes our JSON message structure, appends convo and draws messages
say(data.length);
for (var i=0;i<data.length;i++){
  convo=data[i];
}
}

function drawConvos(treeList){
  //Draws a list of convos

  for (var c=0;c<treeList.length;c++){
    drawConvoJSON(treeList[c]);
  }
}

function drawMsgsTree(node){
  //Draws messages from tree structure

  //drawMsgsRec(node,ycount,xcount,0,0);
  drawMsgsRecLines(node,ycount,xcount,0);

  maxCol=0;
  xcount=startx;
  ycount=starty;
}

//LL page drawing




function drawReplyPrep(hConvo,id,x,y)
{//REMEMBER the reply floatmsg contains the ID of the parent.
  //Later it should have its own ID worked in.
   var msg=$(floatreplyxy(x,y,id,'ha','he'));
  hConvo.append(msg);
 //$('#convoHolder').append(floatreply('reply:'));
}


//HL Comms

function getStartMessages(){
  say('startm');
  aGetMessagesByUID();

}

function addMsgsDust(data){
  //Rendering
  var compiled = dust.compile("Message:<br /> {#.}{.text}<br>{/.} ", "dust-message");
  dust.loadSource(compiled);
msg=dust.render("dust-message", { text: data.text },function(err, out) {
$('#convoHolder').append(out);
});
}

//AJAX requests

function sendReply(event){
  console.log('new convo');
  msg=$(event.target).closest('.floatmsg');
  convoID=$(event.target).closest('.convoBox').data('id');
  text=msg.find('.replyText').val();
  msgID=msg.data('id');
  console.log('id '+msgID);
  say(text);
  $.ajax({
    url:"/reply",
    data: {type:'wall',csrfmiddlewaretoken:getCookie('csrftoken'),
    text:text,parentID:msgID,
    convoID:convoID },
    dataType: "html",
    type: "GET",
    success:sendReplySuccess,
    error:function(data){say('no');}

});
}

function sendReplySuccess(data){
location.reload();
}

function sendConverse(event){
  console.log('new convo');
  msg=$(event.target).closest('.floatmsg');
  //convoID=$(event.target).closest('.convoBox').data('convoID');
  text=msg.find('.text').val();
 // msgID=msg.data('id');
  //console.log('id '+msgID);
  say(text);
  $.ajax({
    url:"/converse",
    data: {type:'wall',csrfmiddlewaretoken:getCookie('csrftoken'),
    text:text},
    dataType: "html",
    type: "GET",
    success:successConverse,
    error:function(data){say('no');}

});
}

function aGetConvosByUID(){
  $.ajax({
    url:"/getConvosByUID",
    data: {csrfmiddlewaretoken:getCookie('csrftoken'),
      },
    dataType: "json",
    type: "GET",
    success:function(data){
      //var jsonData=JSON.parse(data);
      //addMsgs(data);},
      drawConvos(data);},
    error:function(data){say('no');}
});
}

function aGetMessagesByUID(){
  $.ajax({
    url:"/getMessagesByUID",
    data: {csrfmiddlewaretoken:getCookie('csrftoken'),
      handle:gCurrentPersonHandle,
      personUID:gCurrentPersonUID},
    dataType: "json",
    type: "GET",
    success:function(data){
      
      //var jsonData=JSON.parse(data);
      drawConvos(data);
    },
    error:function(data){say('no');}
});
}



//Helpers





