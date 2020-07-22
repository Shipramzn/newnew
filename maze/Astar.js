function solve_using_astar(heu){
clear_path();
var flag=0
var path=[]
var openList=[]      // to store elements which are still to be evaluated
var closedList=[]        // to store elements which are already being evaluated

var time_s = new Date().getTime();

openList.push(tiles[sc][sr])        //adding start tile to openSet
while(openList.length >0){
    var tile_with_lowest_f =0                 
    for(var i=0;i<openList.length;i++){
        if(openList[i].f < openList[tile_with_lowest_f].f){
            tile_with_lowest_f =i
        }
    }
    var current = openList[tile_with_lowest_f]
    if(current === tiles[ec][er]){        //if destination is found
        path =path_f(current)            
        flag =1
        break;                            //then break
   }
    remove(openList,current) 
    closedList.push(current)
    var neighbors= addNeighbors(current,current.c,current.r)
    for(var i=0;i<neighbors.length;i++){               
        var neighbor = neighbors[i]
        if(!closedList.includes(neighbor) && neighbor.state != 'w'){  
           // ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
           var tempG    
           if(isDiagonal(current,neighbor)){
               tempG = current.g + Math.SQRT2
           }  else{
            tempG = current.g +1    
           }                                           // this means the neighbor has not been evaluated yet                                 
            var betterPath = false
            if(openList.includes(neighbor)){           // if element is already present in openSet       
                if(tempG < neighbor.g){
                    neighbor.g = tempG                // then get the better g 
                    betterPath=true
                }
            }else{
                neighbor.g = tempG                   //else add element to openSet
                openList.push(neighbor)
                betterPath=true
            }
            if(betterPath){
               //console.log(weight)

                neighbor.h= weight * heuristic(neighbor,tiles[ec][er],heu)
                neighbor.f = neighbor.g + neighbor.h      
                neighbor.previous = current
            }
        }
    }    
}
var time_e = new Date().getTime();

if(flag === 0){
    console.log('No Possible Path')
}else{
    console.log('Path exists')
    var i=0
    var j=0
    var k=0
    path.reverse()
    let timerId= window.setInterval(function(){
        if(i === closedList.length){
            i=0
            clearInterval(timerId)
        }else{
            if(!path.includes(closedList[i])){
               closedList[i].state='p'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
            }
        }
        i++
    }, 10)
    var len= length(path).toFixed(2)

    // setTimeout(() => {clearInterval(timerId)}, closedList.length * 100);
    let timerId1= window.setInterval(function(){
        if(j === openList.length){
            j=0
            clearInterval(timerId1)

        }else{
            if(!path.includes(openList[j])){
                openList[j].state ='l'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
               
            }
        }
        j++
    }, (closedList.length*11)/(openList.length))
    // setTimeout(() => { clearInterval(timerId1)}, closedList.length * 100);
    let timerId2= window.setInterval(function(){
        if(k=== path.length){
            k=0
            document.getElementById("outcome").innerHTML = `Length= ${len} <br> Time= ${(time_e-time_s).toFixed(3)}ms`;
            clearInterval(timerId2)
        }else{
            path[k].state='x'
            tiles[sc][sr].state='s'
            tiles[ec][er].state='f'
        }
        k++;   
}, (closedList.length*11)/(path.length))
// setTimeout(() => { clearInterval(timerId2) }, closedList.length * 100);
}
}
       
   
