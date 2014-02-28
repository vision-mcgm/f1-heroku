//Helpers

function prepareText(text){
  //Prepares JSON text for HTML render

text= text.replace(/</g, '&lt;');
text= text.replace(/>/g, '&gt;');
text= text.replace(/\n/g, '<br />');
return text;

}
  

  //HTML generator functions


function vertLine(x1,y1,x2,y2){
  console.log('DRAWVERT '+x1+' '+y1+' '+x2+' '+y2);
  return '<div class="vertLine" style="position: absolute; left:'+x1+'px; top: '+y1+'px; height:'+(y2-y1)+'px;"></div>';
}

function horizLine(x1,y1,x2,y2){
  console.log('DRAWHORIZ '+x1+' '+y1+' '+x2+' '+y2);
  return '<div class="horizLine" style="position: absolute; left:'+x1+'px; top: '+y1+'px; width:'+(x2-x1)+'px;"></div>';
}

function convoBox(id){
return '<div class="convoBox" data-id="'+id+'"></div>';
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

