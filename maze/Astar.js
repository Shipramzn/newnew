function solve_using_astar(heu){
clear_path();
var flag=0
var path=[]
var openSet=[]      // to store elements which are still to be evaluated
var closedSet=[]        // to store elements which are already being evaluated

var time_s = new Date().getTime();

openSet.push(tiles[sc][sr])        //adding start tile to openSet
while(openSet.length >0){
    var  winner =0                 
    for(var i=0;i<openSet.length;i++){
        if(openSet[i].f < openSet[winner].f){
            winner =i
        }
    }
    var current = openSet[winner]
    if(current === tiles[ec][er]){        //if destination is found
        path =path_f(current)            
        flag =1
        break;                            //then break
   }
    removeFromArray(openSet,current)
    closedSet.push(current)
    var neighbors= addNeighbors(current,current.c,current.r)
    for(var i=0;i<neighbors.length;i++){               
        var neighbor = neighbors[i]
        if(!closedSet.includes(neighbor) && neighbor.state != 'w'){  
           // ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
           var tempG    
           if(isDiagonal(current,neighbor)){
               tempG = current.g + Math.SQRT2
           }  else{
            tempG = current.g +1    
           }                                           // this means the neighbor has not been evaluated yet                                 
            var newPath = false
            if(openSet.includes(neighbor)){           // if element is already present in openSet       
                if(tempG < neighbor.g){
                    neighbor.g = tempG                // then get the better g 
                    newPath=true
                }
            }else{
                neighbor.g = tempG                   //else add element to openSet
                openSet.push(neighbor)
                newPath=true
            }
            if(newPath){
               console.log(weight)

                neighbor.h= weight * heuristic(neighbor,tiles[ec][er],heu)
                neighbor.f = neighbor.g + neighbor.h      
                neighbor.previous = current
            }
        }
    }    
}
var time_e = new Date().getTime();

if(flag === 0){
    console.log('No solution exists')
}else{
    console.log('Solution exists')
    var i=0
    var j=0
    var k=0
    path.reverse()
    let timerId= window.setInterval(function(){
        if(i === closedSet.length){
            i=0
        }else{
            if(!path.includes(closedSet[i])){
                closedSet[i].state='p'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
            }
        }
        i++
    }, 10)
    var len= length(path).toFixed(2)

    setTimeout(() => { clearInterval(timerId); console.log('solution exists'); }, closedSet.length * 100);
    let timerId1= window.setInterval(function(){
        if(j === openSet.length){
            j=0
            document.getElementById("outcome").innerHTML = `Length= ${len} <br> Time= ${(time_e-time_s)}ms`;

        }else{
            if(!path.includes(openSet[j])){
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
                openSet[j].state ='l'
            }
        }
        j++
    }, (closedSet.length*11)/(openSet.length))
    setTimeout(() => { clearInterval(timerId1); console.log('solution exists'); }, closedSet.length * 100);
    let timerId2= window.setInterval(function(){
        if(k=== path.length){
            k=0
        }else{
            path[k].state='x'
            tiles[sc][sr].state='s'
            tiles[ec][er].state='f'
        }
        k++;   
}, (closedSet.length*11)/(path.length))
setTimeout(() => { clearInterval(timerId2); console.log('solution exists'); }, closedSet.length * 100);
}
}
       
   
