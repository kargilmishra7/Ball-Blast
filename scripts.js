var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var w=canvas.width;
var h=canvas.height;
var dx=0;
var dy=660;
var rightPressed = false;
var leftPressed = false;
var x1=[];
var y1=[];
var x2=[];
var y2=[];

var cx1=0,cy1=0,cx2=0,cy2=0; 
var y= Math.floor(Math.random()*(200-20))+20;;var x = 20;
var a=2,b=2;
var random=Math.floor(Math.random()*(500-50))+50;
var score=0;
var t1;
var d=15;




document.addEventListener("keydown",down,false);
document.addEventListener("keyup",up,false);

function down(e){
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }
 function up(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }



function drawCanon(){

ctx.beginPath();
ctx.fillStyle = "#0095DD";
ctx.fillRect(dx,dy,30,30);
ctx.closePath();
}

function bullet(){
    t=false;
    t1=false;
    cx2=dx+5;
    cx1=dx+15;
    cy1 =dy-10;
    cy2= dy-10;
    x1.push(cx1);
    y1.push(cy1);
    x2.push(cx2);
    y2.push(cy2);
    ctx.fillStyle="red";
   for(var i=0;i<x1.length;i++){

       ctx.beginPath();
       ctx.fillRect(x1[i],y1[i],5,5);
       ctx.fillRect(x2[i],y2[i],5,5);
       ctx.closePath();
       ctx.beginPath();
       ctx.rect(x1[i]-25,y1[i]-25,55,30);
       t= ctx.isPointInPath(x,y);
       ctx.rect(x2[i]-25,y2[i]-25,55,30);
       t1= ctx.isPointInPath(x,y);
       ctx.closePath();
       if(t1 || t){
           x1[i]+= w;
           x2[i]+= w;
           score++;
           if(random>0)
           {random--;}
           else{
            random=Math.floor(Math.random()*(500-50))+50;  
           }
           
       }
       
    
       y1[i]-=d;
       y2[i]-=d;
   }
}

function ball(){
    ctx.beginPath();
    ctx.fillStyle="yellow";
    ctx.arc(x,y,25,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
    ctx.font="20px Comic Sans MS";
    ctx.fillStyle="black";
    ctx.fillText(random,x-15,y);
    ctx.font="25px Comic Sans MS";
    ctx.fillStyle="black";
    ctx.fillText(score,w/2-30,40);
    if(x<5 || x>w-25)
    a=-a;
    if(y<5 || y>h-25)
    b=-b;
    x+=a;
    y+=b;
}

function over(){
    t2=false;
    ctx.beginPath();
       ctx.rect(dx-25,dy-25,80,55);
       t2= ctx.isPointInPath(x,y);
       if(t2){
        alert("GAME OVER");
        document.location.reload();
        window.cancelAnimationFrame(raf);
       }
       ctx.closePath();
}
function draw(){
    
    ctx.clearRect(0,0,w,h);
    drawCanon();
    
    
   if(rightPressed && dx < canvas.width-30) {
    dx += 7;
}
    else if(leftPressed && dx > 0) {
    dx -= 7;
}
bullet();
ball();
over();

var raf = requestAnimationFrame(draw);

}
draw();

//var interval = setInterval(draw,15);