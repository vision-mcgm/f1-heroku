function drawMsgsRecLines(node,x,y,depth){
  var yFirstChild=0;
  var xFirstChild=0;
  var xMaxLastChild=0;
  var yMaxLastChild=0;

  console.log('CALL x '+String(x)+' y '+String(y)+' '+String(depth));
  //Recursive call children
  for (var n=0;n<node.children.length;n++){
    pos=drawMsgsRecLines(node.children[n],x,y,depth+1);
    x=pos[0];
    y=pos[1];
    depth=pos[2];
    if (n==0){
      //If at first child
       yFirstChild=y;
       xFirstChild=x;
    }
   
      if(n==node.children.length-1){
      //If at final child
      xMaxLastChild=0;
      yMaxLastChild=pos[4];
    }
}
  //Draw this node

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
    var bottomThisMsg=drawy+mHeight+2*msgBorder;
    //console.log('bottom '+bottom);
    var xThisNode=drawx+msg.width()+3;
    //Does the internode overflow the current barY?
    if (bottom>barY){
      console.log('SETBARY from '+String(barY)+' to ' +String(bottom));
      barY=bottom;      
    }
    //yMaxLastChild=drawy+50;
    //Draw vertical line
  line=vertLine(xFirstChild-5,yFirstChild,xFirstChild,yMaxLastChild);
  console.log(line);
  hConvoAddingTo.append(line);
  //Draw horizontal line
  //console.log('bottom '+bottom);
  yLine=(bottomThisMsg+drawy)/2;
  hline=horizLine(xThisNode,yLine,xFirstChild-5,yLine);
  console.log(line);
  hConvoAddingTo.append(hline);
  }
  //Adjust height
  console.log('bott '+String(bottom)+' mhbd '+String(maxHeightsByDepth[depth]) +' max '+String(Math.max(maxHeightsByDepth[depth],bottom)));
  maxHeightsByDepth[depth]=Math.max(maxHeightsByDepth[depth],barY);
  hConvoAddingTo.height(maxHeightsByDepth[depth]+convoHolderYBuffer);
  
  //Prep and return
  depth=depth-1;
  console.log('RETURN x '+String(x)+' y '+String(y)+' '+String(depth)+' b '+bottom);
  return [drawx,drawy,depth,bottom,drawy+mHeight];
}