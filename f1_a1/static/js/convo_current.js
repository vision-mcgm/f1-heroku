//Variables
  var xcount=10;
var ycount=10;
var dy=30;
var dx=10;
var startx=15;
var starty=7;
var hConvoAddingTo;
var maxCol=0;


//DocumentReady handlers
$(function()
{
  xcount=10;
  ycount=10;

$('#startConv').click(addConvo);
//Handlers:
 //$(document.body).on( "click", '.test', reply);
 //$(document.body).on( "click", '.bPostNewConvo', postNewConvo); //Old?
$(document.body).on( "click", '.replylink', prepReply);
$(document.body).on( "click", '.submitlink', sendReply);
$(document.body).on( "click", '.converselink', sendConverse);
//$(document.body).on( "click", '.converselink', startNewConvo);
 var csrf_token = getCookie('csrftoken');
 //$('#box-convo').append(newConvo());
 loadStartMessages();
 $('#convoHolder').css("height", "500px");
});

//Functions

function prepReply(event){
  say('Reply prepped.');
  parentMsg=$(event.target).closest('.floatmsg');
  x=parentMsg.data('x')+parentMsg.width()+dx;
  id=parentMsg.data('id');
  y=$(event.target).closest('.floatmsg').data('y');
  hConvo=$(event.target).closest('.convoBox');
  drawReplyPrep(hConvo,id,x,y);
}

function loadStartMessages(){
  getStartMessages();
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

//OLD
function postNewConvo(event){
  say('posting');
    text=$(event.target).closest('.box-message').find('.tMsg').val();
$.ajax({
    url:"/converse",
    data: {type:'beavers',csrfmiddlewaretoken:getCookie('csrftoken'),
    text:text },
    dataType: "html",
    type: "GET",
    success:function(data){say(data);},
    error:function(data){say('no');}

});
}

function sendReply(event){
  console.log('new convo');
  msg=$(event.target).closest('.floatmsg');
  convoID=$(event.target).closest('.convoBox').data('convoID');
  text=msg.find('.text').val();
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
    success:function(data){say(data);},
    error:function(data){say('no');}

});
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

function jsonConvoToTree(data){
  //Takes JSON-converted data for one convo
  var success=0;
while (data.length){
  console.log('going round');
  for (var i=0;i<data.length;i++){
    success=tryToAdd(data[i]);
    if (success){
      data.splice(i,1);//Remove element
    }
  }
}

}

function tryToAdd(data,node){
  var success=0;
  //Tries to add a node to a tree
if (node.id==data.ID){
  node[node.length+1]=data;
  success=1;
}
return success;
}

//Page drawing

function addMsgs(data){
  //Takes our JSON message structure, appends convo and draws messages
say(data.length);
for (var i=0;i<data.length;i++){

  convo=data[i]
  hConvoAddingTo=$(convoBox());
  $('#convoShelf').append(hConvoAddingTo);
  initMsg=convo[0];//Maybe a slight HACK
  drawMsgsRec(initMsg,xcount,ycount);
  maxCol=0;
  xcount=startx;
  ycount=starty;
}
}

function drawMsgsRec(node,row,col){
  //Takes a JSON node structure, with row and col - recursive function
  // console.log('called ' + row.toString() + ' '+col.toString());
if (node[0] !== undefined){
  //console.log('node l: '+node.length.toString());
  console.log('starting loop of len '+node.length.toString());
for (var n=0;n<node.length;n++){
      console.log(n.toString());
  pos=drawMsgsRec(node[n],row,col);
  row=pos[0];
  if (n>0){
  col=pos[1];}
  maxCol=Math.max(maxCol,pos[1]);
  //Can optimise by inlining these two lines
  hConvoAddingTo.height(maxCol);
}
}
  var msg=$(floatmsgxy(row,col,node.id,node.text,node.name));
  hConvoAddingTo.append(msg);
  row=row+msg.width()+dx;
  col=col+msg.height()+dy;
  hConvoAddingTo.height(msg.height()+15);
  return [row,col];
}

//$('#convoHolder').height(ycount+dy);
//}


function addMsgsTree(data)
{
  console.log('building tree');
}



function drawReplyPrep(hConvo,id,x,y)
{//REMEMBER the reply floatmsg contains the ID of the parent.
  //Later it should have its own ID worked in.
   var msg=$(floatreplyxy(x,y,id,'ha','he'));
  hConvo.append(msg);
 //$('#convoHolder').append(floatreply('reply:'));
}


//Comms

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
      addMsgsTree(data);},
    error:function(data){say('no');}
});
}

function aGetMessagesByUID(){
  $.ajax({
    url:"/getMessagesByUID",
    data: {csrfmiddlewaretoken:getCookie('csrftoken'),
      },
    dataType: "json",
    type: "GET",
    success:function(data){
      //var jsonData=JSON.parse(data);
      addMsgs(data);},
    error:function(data){say('no');}
});
}




function qNewConvo(){
$.ajax({
    url:"/converse",
    data: {type:'beavers',csrfmiddlewaretoken:getCookie('csrftoken') },
    dataType: "html",
    type: "GET",
    success:function(data){say(data);},
    error:function(data){say('no');}

});
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  



