const canvas= document.getElementById("myCanvas");
const ctx= canvas.getContext("2d");
const Height= canvas.height;
const Width= canvas.width;
var img = document.getElementById("image");
var img2 = document.getElementById("image2");

var output;
var gap= 3;
var cnt;
var sr=11;
var sc=20;
var ec= 30;
var er=11;

tileW= 27;
tileH=27;

tileRow= 28;
tileColumn= 67;

boundX=0;
boundY=0;

var tiles=[];
for (c=0; c < tileColumn; c++){
    tiles[c]=[];

    for(r=0; r < tileRow; r++){
        tiles[c][r]= {
            x: c*(tileW+gap),
            y: r*(tileH+gap),
            state: 'e'//e for empty
        };
    }
}
tiles[sc][sr].state= 's';
tiles[ec][er].state= 'f';



function rect(x,y,w,h,state,c,r){

    if (state==='s'){
        // ctx.fillStyle='#00FF00';        
        ctx.drawImage(img,x,y,tileW,tileH);              
    }
    // else if (state==='sm'){
    //     ctx.fillStyle='#00FF00';        
    // }
    else if (state==='f'){
        ctx.drawImage(img2,x,y,tileW,tileH);              
    }
    else if (state==='e'){
        ctx.fillStyle= '#000000';
    }
    else if(state==="w"){
        ctx.fillStyle= '#6C6C6C';
    }
    else if(state==="x"){
        ctx.fillStyle="#059A16";
    }
    else
    {
        ctx.fillStyle="#CBF1EB";
        tiles[c][r].state='v';
    }

    ctx.beginPath();
    if (state != 's' && state != 'f'){
        ctx.rect(x,y,w,h);
    }
    // ctx.rect(x,y,w,h);

    ctx.closePath();
    ctx.fill();
}

function clear(){
    ctx.clearRect(0,0,Width,Height);
}

function draw(){
    clear();

    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state,c,r);
        }
    }
 
}

function myMove(e){
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            if (c*(tileW+gap)<x && x < c*(tileW+gap)+tileW && r*(tileH+gap)<y && y < r*(tileH+gap)+tileH){
                if (tiles[c][r].state === 'e' && (c != boundX || r != boundY) && cnt === 2) {
                    tiles[c][r].state = 's';
                    tiles[boundX][boundY].state = 'e';
                    boundX = c;
                    boundY = r;
                    sc=c;
                    sr=r;
                }
                else if (tiles[c][r].state === 'e' && (c != boundX || r != boundY) && cnt === 4) {
                    tiles[c][r].state = 'f';
                    tiles[boundX][boundY].state = 'e';
                    boundX = c;
                    boundY = r;
                    ec=c;
                    er=r;
                }
                else if ((tiles[c][r].state === 'e' || tiles[c][r].state === 'v') && (c != boundX || r != boundY) && cnt === '1') {
                    tiles[c][r].state = 'w';
                    boundX = c;
                    boundY = r;
                }
                else if (tiles[c][r].state === 'w' && (c != boundX || r != boundY) && cnt === '1') {
                    tiles[c][r].state = 'e';
                    boundX = c;
                    boundY = r;
                }
                else if ((c != boundX || r != boundY) && cnt === '3' && tiles[c][r].state === 'w') {
                    tiles[c][r].state = 'e';
                    boundX = c;
                    boundY = r;
                }
            }
        }
    }
}


function myDown(e){
    
    canvas.onmousemove= myMove;
    
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            if (c*(tileW+gap)<x && x < c*(tileW+gap)+tileW && r*(tileH+gap)<y && y < r*(tileH+gap)+tileH){
                if (tiles[c][r].state==='e'){
                    tiles[c][r].state='w';
                    cnt='1';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='w'){
                    tiles[c][r].state='e';
                    cnt='1';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='s'){
                    boundX=c;
                    boundY=r;
                    cnt=2;
                    sc=c;
                    sr=r;
                }
                else if (tiles[c][r].state==='f'){
                    boundX=c;
                    boundY=r;
                    cnt=4;
                    ec=c;
                    er=r;
                }
                else{
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                }
            }
        }
    }
    canvas.onmousemove= myMove;
}

function myUp(){
    canvas.onmousemove= null;
}

function solveMaze()
{
    var Xqueue=[sc];
    var Yqueue=[sr];

    var pathFound=false;

    var xLoc;
    var yLoc;

    while(Xqueue.length>0 && pathFound===false)
    {
        xLoc=Xqueue.shift();
        yLoc=Yqueue.shift();

        if(xLoc>0)
        {
            if(tiles[xLoc-1][yLoc].state==="f")
            {
                pathFound=true;
            }
        }
        if(xLoc<tileColumn-1)
        {
            if(tiles[xLoc+1][yLoc].state==="f")
            {
                pathFound=true;
            }
        }
        if(yLoc>0)
        {3
            if(tiles[xLoc][yLoc-1].state==="f")
            {
                pathFound=true;
            }
        }
        if(yLoc<tileRow-1)
        {
            if(tiles[xLoc][yLoc+1].state==="f")
            {
                pathFound=true;
            }
        }
        if(xLoc>0)
        {
            if(tiles[xLoc-1][yLoc].state==="e")
            {
                Xqueue.push(xLoc-1);
                Yqueue.push(yLoc);
                tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+"l";
            }
        }
        if(xLoc<tileColumn-1)
        {
            if(tiles[xLoc+1][yLoc].state==="e")
            {
                Xqueue.push(xLoc+1);
                Yqueue.push(yLoc);
                tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+"r";
            }
        }
        if(yLoc>0)
        {
            if(tiles[xLoc][yLoc-1].state==="e")
            {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc-1);
                tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc].state+"u";
            }
        }
        if(yLoc<tileRow-1)
        {
            if(tiles[xLoc][yLoc+1].state==="e")
            {
                Xqueue.push(xLoc);
                Yqueue.push(yLoc+1);
                tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+"d";
            }
        }
    }
    if(!pathFound)
    {
        output.innerHTML="No Solution";
    }
    else
    {
        output.innerHTML="Solved!!";
        var path=tiles[xLoc][yLoc].state;
        var pathLength=path.length;
        var currX=sc;
        var currY=sr;
        for(var i=0;i<pathLength-1;i++)
        {
            if(path.charAt(i+1)==="u")
            {
                currY-=1;
            }
            if(path.charAt(i+1)==="d")
            {
                currY+=1;
            }
            if(path.charAt(i+1)==="r")
            {
                currX+=1;
            }
            if(path.charAt(i+1)==="l")
            {
                currX-=1;
            }
            tiles[currX][currY].state="x";
        }
    }
}

function reset()
{
    for (c=0; c < tileColumn; c++){
        tiles[c]=[];
    
        for(r=0; r < tileRow; r++){
            tiles[c][r]= {
                x: c*(tileW+gap),
                y: r*(tileH+gap),
                state: 'e'//e for empty
            };
        }
    }
    tiles[sc][sr].state= 's';
    tiles[ec][er].state= 'f';

    output.innerHTML="";
}

function init(){
    output= document.getElementById("outcome");
    return setInterval(draw,10);
}

init();

canvas.onmousedown= myDown;
canvas.onmouseup= myUp;
