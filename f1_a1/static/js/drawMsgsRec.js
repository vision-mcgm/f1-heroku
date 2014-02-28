unction drawMsgsRec(node,x,y,depth){
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
    if (node.id==-1){ 
    var msg=$(floatreplyxy(drawx,drawy,node.replyTo,node.name,node.handle));
    }else{
    var msg=$(floatmsgxy(drawx,drawy,node.id,node.text,node.name,node.handle));
  }
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
    var msg=$(floatmsgxy(drawx,drawy,node.id,node.text,node.name,node.handle));
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
