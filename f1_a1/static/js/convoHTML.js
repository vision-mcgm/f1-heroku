//Helpers

function prepareText(text){
  //Prepares JSON text for HTML render

text= text.replace(/</g, '&lt;');
text= text.replace(/>/g, '&gt;');
text= text.replace(/\n/g, '<br />');
return text;

}
  

  //HTML generator functions

function convoBox(id){

return '<div class="convoBox" data-id="'+id+'"></div>';
}

function floatmsg(text,name){

  return '<div class="floatmsg" style="position: relative; left:40px; top: 3px;"><i>' +name+ '</i> : '+text+'<br />\
  <a class="replylink">reply</a></div>';
}

function floatmsgxy(x,y,id,text,name,handle){

  return '<div class="floatmsg" style="position: absolute; left:'+x+'px; top: '+y+'px;" data-x="'+x+'"\
  data-y="'+y+'" data-id="'+id+'"><i>' +handle+' ~ '+name+ '</i> : <br />'+prepareText(text)+'<br />\
  <a class="replylink">reply</a></div>';
}

function floatreplyxy(x,y,id,name,handle){
  return '<div class="floatmsg" style="position: absolute; left:'+x+'px; top: '+y+'px;" data-x="'+x+'"\
  data-y="'+y+'" data-id="'+id+'"><i>' +handle+' ~ '+name+ '</i> : <br />\
  <textarea class="replyText" style="height:200px;"></textarea>\
  <a class="submitlink">submit</a></div>';
}

function floatconversexy(x,y,name){
  return '<div class="floatmsg" style="left:'+x+'px; top: '+y+'px;" data-x="'+x+'"\
  data-y="'+y+'"><i>' +name+ '</i> : <br />\
  <input class="text">\
  <a class="converselink">submit</a></div>';
}

function newColumn(){
  return '<div class="box-column">\
  New column\
  </div>'
}

function newColumnTD(){
  return '<td>' + newMessage() +'  </td>';
}

function newConvo(){
  return '<div class="box-convo">\
 <table><tr><td>'+ newConvoMessage() +
  '<div class="test">\
  </div>\
</td></tr></table>\
  </div>\
  </div>';
}

function newMessage(){
  return '<div class="box-message">A New Message\
   <input type="text" class="tMsg">\
  <div class="test">\
  <input class="button" type="submit" value="Reply" />\
  </div>\
  </div>';
}

function newConvoMessage(){
  return '<div class="box-message">A New Message\
   <input type="text" class="tMsg">\
  <div class="bPostNewConvo">\
  <input class="button" type="submit" value="Reply" />\
  </div>\
  </div>';
}