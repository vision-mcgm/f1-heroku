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

function reInitVars(){
xcount=10;
ycount=10;
dy=10;
dx=10;
startx=10;
starty=7;
hConvoAddingTo;
maxRow=0;
maxCol=0;
maxHeightsByDepth=new Array();
maxHeightsByDepth[0]=0;
maxHeightsByDepth[1]=0;
maxHeightsByDepth[2]=0;
maxHeightsByDepth[3]=0;
maxHeightsByDepth[4]=0;
barY=0;
msgWidth=210;
convoHolderYBuffer=10;
}


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
$(document.body).on( "click", '.replylink', prepReply);
$(document.body).on( "click", '.submitlink', sendReply);
$(document.body).on( "click", '.converselink', sendConverse);
//$(document.body).on( "click", '.converselink', startNewConvo);
 var csrf_token = getCookie('csrftoken');
 //$('#box-convo').append(newConvo());
 getStartMessages();
 $('#convoHolder').css("height", "500px");
}

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
    if (msg.parent==2){
      //Root node
      msgTree.text=msg.text;
      msgTree.name=msg.name;
      msgTree.id=msg.id;
      msgTree.children=[];
      msgList.splice(i,1);//Remove element

    }
    else{
      if (typeof msgTree.children != 'undefined'){
    success=tryToAdd(msgList[i],msgTree);
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

function tryToAdd(data,node){
  //Tries to add a node to a tree - RECURSIVE
var success=0;
if (node.id==data.parent){
  var newNode=new Object();
      newNode.text=msg.text;
      newNode.name=msg.name;
      newNode.id=msg.id;
      newNode.children=[];
  node.children.push(newNode);
  return 1;
}
for (var i=0;i<node.children.length;i++){
  success=tryToAdd(data,node.children[i]);
  if (success) return 1;
}
}

//HL page drawing

function drawConvo(convo)
{

  hConvoAddingTo=$(convoBox(convo.convoID));
  $('#convoShelf').append(hConvoAddingTo);
  convoTree=jsonMsgListToTree(convo.msgs);
  maxRow=0;
  barY=0;

  //MESSY - need to init levels better
  maxHeightsByDepth[0]=0;
maxHeightsByDepth[1]=0;
maxHeightsByDepth[2]=0;
maxHeightsByDepth[3]=0;
maxHeightsByDepth[4]=0;
  console.log('CONVO START');
  drawMsgsTree(convoTree); 
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
    drawConvo(treeList[c]);
  }
}

function drawMsgsTree(node){
  //Draws messages from tree structure

  //drawMsgsRec(node,ycount,xcount,0,0);
  drawMsgsRec2(node,ycount,xcount,0);

  maxCol=0;
  xcount=startx;
  ycount=starty;
}

//LL page drawing

function drawMsgsRec2(node,x,y,depth){
  var yFirstChild=0;

  console.log('CALL x '+String(x)+' y '+String(y)+' '+String(depth));
  for (var n=0;n<node.children.length;n++){
    pos=drawMsgsRec2(node.children[n],x,y,depth+1);
    x=pos[0];
    y=pos[1];
    depth=pos[2];
    if (n==0){
      //If at first node
       yFirstChild=y;
    }
}
  //Draw

  console.log('y '+String(y)+' yfc '+String(yFirstChild) +' bary '+String(barY));

  if (!node.children.length){
    //We are at a leaf
    var drawx=startx+depth*msgWidth;
    var drawy=barY+dy;
    var msg=$(floatmsgxy(drawx,drawy,node.id,node.text,node.name));
    hConvoAddingTo.append(msg);
    var mHeight=msg.height();
    console.log('DRAW-LEAF x '+String(drawx)+' y '+String(drawy)+' t '+node.text+' d '+String(depth)+' h '+String(mHeight));
    //Adjust bar
    
    var bottom=drawy+mHeight+2*msgBorder;
    console.log('SETBARY from '+String(barY)+' to ' +String(bottom));
    barY=bottom;
  }
  else
  {//We are at an intermediate node
    var drawx=startx+(depth*msgWidth);
    var drawy=yFirstChild;
    var msg=$(floatmsgxy(drawx,drawy,node.id,node.text,node.name));
    hConvoAddingTo.append(msg);
    var mHeight=msg.height();
     console.log('DRAW-INTE x '+String(drawx)+' y '+String(drawy)+' t '+node.text+' d '+String(depth)+' h '+String(mHeight));
   
    var bottom=y+mHeight+2*msgBorder;
    //Does the internode overflow the current barY?
    if (bottom>barY){
      console.log('SETBARY from '+String(barY)+' to ' +String(bottom));
      barY=bottom;
      
    }
  }
  //Adjust height
  //newHeight=callRow+msg.height()+dy;
  console.log('bott '+String(bottom)+' mhbd '+String(maxHeightsByDepth[depth]) +' max '+String(Math.max(maxHeightsByDepth[depth],bottom)));

  maxHeightsByDepth[depth]=Math.max(maxHeightsByDepth[depth],barY);
  hConvoAddingTo.height(maxHeightsByDepth[depth]+convoHolderYBuffer);
  //if (hConvoAddingTo.height()>maxHeightsByDepth[depth]){
    //hConvoAddingTo.height(maxHeightsByDepth[depth]);
  //}
  depth=depth-1;
  console.log('RETURN x '+String(x)+' y '+String(y)+' '+String(depth));
  return [drawx,drawy,depth];

}


function drawMsgsRec(node,row,col,depth,descend,lastChild){
  //Takes a JSON node structure, with row and col - recursive function
  // console.log('called ' + row.toString() + ' '+col.toString());

  //console.log('node l: '+node.length.toString());
 // console.log('starting loop of len '+node.childlength.toString());
 var callRow=row;
 var callCol=col;
 console.log('CALL r '+String(row)+' c '+String(col)+' '+String(depth));
for (var n=0;n<node.children.length;n++){
      console.log(n.toString());
      if (n==0){
        //First child
  pos=drawMsgsRec(node.children[n],row,col+200+dx,depth+1,1);
  var topRow=row;
      console.log('top '+topRow);
}else{
//Following children
  pos=drawMsgsRec(node.children[n],row,col+200+dx,depth+1,1);
  // topRow=row;
}
  row=pos[0];
  //if (n>0){
  col=pos[1];
  depth=pos[2];
  var oldrow=row;
  var oldcol=col;
//}
  //maxRow=Math.max(maxRow,pos[1]);
  //Can optimise by inlining these two lines
  //hConvoAddingTo.height(maxRow);
}
//row=topRow;
//Turnaround

if (!node.children.length){
  //If at leaf
   maxCol=200*depth;
   var ypos=row;
}else{
  //If not at leaf
  var ypos=topRow;
}
var xpos=col;
//col=maxCol-(200*depth);
  
  var msg=$(floatmsgxy(xpos,ypos,node.id,node.text,node.name));
  hConvoAddingTo.append(msg);
  console.log('DRAW r '+String(ypos)+' c '+String(xpos)+' t '+node.text+' d '+String(depth)+' h '+String(msg.height()));
  newHeight=callRow+msg.height()+dy;
  nextFreeRow=row;
   if (descend){
    //If not the first sibling
    
  row=newHeight;
}

// if (descend) row=newHeight;
  //hConvoAddingTo.height(newHeight);
  maxHeightsByDepth[depth]=Math.max(maxHeightsByDepth[depth],newHeight);
  if (hConvoAddingTo.height()<maxHeightsByDepth[depth]){
  hConvoAddingTo.height(maxHeightsByDepth[depth]);
}
  col=col-200-dx;
  depth=depth-1;
    console.log('RETURN r '+String(row)+' c '+String(col)+' '+String(depth));
  return [row,col,depth];
}



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
      },
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
  


