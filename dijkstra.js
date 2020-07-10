const canvas= document.getElementById("myCanvas");
const ctx= canvas.getContext("2d");
const Height= canvas.height;
const Width= canvas.width;
//var output;

tileW= 20;
tileH=20;

tileRow= 20;
tileColumn= 50;

boundX=0
boundY=0
let set =[]
let distance =[]
let prev =[]
var dx = [1,-1,0,0];
var dy = [0,0,1,-1];
var tiles=[];
for (c=0; c < tileColumn; c++){
    tiles[c]=[];

    for(r=0; r < tileRow; r++){
        tiles[c][r]= new spot(c,r)
    }
}
function spot(c,r){
    this.x = c*(tileW+3)
    this.y = r*(tileH+3)
    this.c=c
    this.r =r
    this.state = 'e'
    this.g=0  
    /* there is no need of storing neighbors*/
    //this.f=0  no need
    //this.h=0    no need
    // this.neighbors=[]
    // this.addNeighbors = function(tiles){

    //     var c=this.c
    //     var r= this.r
    //     if(c >0 && tiles[c-1][r].state != 'w'){
    //         this.neighbors.push(tiles[c-1][r])
    //     }
    //    if(c < tileColumn-1   && tiles[c+1][r].state != 'w'){
    //     this.neighbors.push(tiles[c+1][r])
    //    }if(r > 0  && tiles[c][r-1].state != 'w'){
    //     this.neighbors.push(tiles[c][r-1])
    //    }if(r < tileRow-1  && tiles[c][r+1].state != 'w'){
    //     this.neighbors.push(tiles[c][r+1])
    //    }
    // }   
}

tiles[0][0].state= 's';  //s for start
tiles[tileColumn-1][tileRow-1].state= 'f';    //f for finish

start = tiles[0][0]
end = tiles[tileColumn-1][tileRow-1]


function rect(x,y,w,h,state){

    if (state==='s'){
        ctx.fillStyle='green';        
    }
    else if (state==='f'){
        ctx.fillStyle= '#FF0000';
    }
    else if (state==='e'){
        ctx.fillStyle= '#AAAAAA';
    }
    else if(state==="w"){       // w for walls
        ctx.fillStyle= 'blue';
    }
    else if(state==="x"){       // x for path
        ctx.fillStyle="pink";
    }
    else
    {
        ctx.fillStyle="burlywood";     // visited tiles
    }

    ctx.beginPath();
    ctx.rect(x,y,w,h);
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
            rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
        }
    }

}

function myMove(e){
    x= e.pageX - canvas.offsetLeft;
    y= e.pageY - canvas.offsetTop;
    
    for (c=0; c < tileColumn; c++){
        for (r=0; r < tileRow; r++){
            if (c*(tileW+3)<x && x < c*(tileW+3)+tileW && r*(tileH+3)<y && y < r*(tileH+3)+tileH){
                if (tiles[c][r].state==='e' && (c!=boundX || r!=boundY)){
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='w' && (c!=boundX || r!=boundY)){
                    tiles[c][r].state='e';
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
            if (c*(tileW+3)<x && x < c*(tileW+3)+tileW && r*(tileH+3)<y && y < r*(tileH+3)+tileH){
                if (tiles[c][r].state==='e'){
                    tiles[c][r].state='w';
                    boundX=c;
                    boundY=r;
                }
                else if (tiles[c][r].state==='w'){
                    tiles[c][r].state='e';
                    boundX=c;
                    boundY=r;
                }
            }
        }
    }
}

function myUp(){
    canvas.onmousemove= null;
}



function reset()
{
    for (c=0; c < tileColumn; c++){
        tiles[c]=[];
    
        for(r=0; r < tileRow; r++){
            tiles[c][r]= {
                x: c*(tileW+3),
                y: r*(tileH+3),
                state: 'e'//e for empty
            };
        }
    }
    tiles[0][0].state= 's';
    tiles[tileColumn-1][tileRow-1].state= 'f';

    output.innerHTML="";
}

function init(){
    output= document.getElementById("outcome");
    return setInterval(draw,10);
}

init();


function display_alert(){
    alert('1. Green box shows the start\n2. Red box shows destination\n3. Draw obstacles and hit SOLVE\n4. Hit RESET if you want to play again' );
}

function removed_element(min_tile){
    var index = set.indexOf(min_tile);
    if (index > -1) {
     set.splice(index, 1);
 }  
 }
function solveMaze(){
    start = 0;
    end = tileColumn*tileRow - 1;
    var arr=[];   
    var prev = new Array(end+1);
    var dist = new Array(end+1);
    for (let i=0;i<=end;i++)dist[i]=Infinity;
    prev[0]=-1;
    dist[0]=0
    arr.push([0,0]);  
    while(arr.length>0){
        if(arr[0][0]==end)break;
        var x = Math.floor(arr[0][0]/tileRow);
        var y = Math.floor(arr[0][0]%tileRow);
        var d = arr[0][1];
        arr.shift();
        for(let i=0;i<4;i++){
            var curx = x + dx[i],cury = y + dy[i];
            if(curx<tileColumn && curx>=0 && cury<tileRow && cury>=0 && tiles[curx][cury].state!="w" &&  d+1<dist[curx*tileRow +  cury]){
                console.log(curx,cury);
                dist[curx*tileRow+ cury]=d+1;
                prev[curx*tileRow + cury]=x*tileRow + y;
                arr.push([curx*tileRow + cury,d+1]);
            }
        }
    }
    if(arr.length==0){
        output.innerHTML = "OOPS! No Solution exists...  :-(";
    }
    else{
        output.innerHTML = "Solved :-)";
        while(end!=-1){
            end=prev[end];
            if(end==0)break;
            var loc_x=Math.floor(end/tileRow),loc_y=end%tileRow;
            // console.log("##",loc_x,loc_y,"##");
            tiles[loc_x][loc_y].state="x";
        }
    }
}

function  heuristic(cur,element){
    var dx = Math.abs(cur.c - element.c)
    var dy=  Math.abs(cur.r- element.r)
    return (dx + dy) 
}
                           
//doubt in this function
function min_dist_tile(){
  var min = Infinity
  var min_tile
    set.forEach(element =>{
      if(element.g  < min){
          min = element.g
          min_tile = element
          
      }
    })
    return min_tile

}

function find_path(prev,distance,end){
    var path =[]
  if(distance[end] == Infinity){
      return path
  }
  path.reverse()
  for(var i=0;i<path.length;i++){
      path.state='x'
  }
}


canvas.onmousedown= myDown;
canvas.onmouseup= myUp;