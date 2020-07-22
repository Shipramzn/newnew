
function solve_using_bestfirst(heu){
    clear_path();
    var openList=[]
   var closedList=[]
   var flag=0
   var path=[]
    //start = tiles[0][0]
    //end = tiles[tileColumn-1][tileRow-1]
    
    openList.push(tiles[sc][sr])

    var time_s = new Date().getTime();
    
    while(openList.length >0){
       
           var tile_with_lowest_h =0    
            for(var i=0;i<openList.length;i++){
                openList[i].h =  weight * heuristic(openList[i],tiles[ec][er],heu)
                openList[tile_with_lowest_h].h =  weight * heuristic(openList[tile_with_lowest_h],tiles[ec][er],heu)
               if(openList[i].h < openList[tile_with_lowest_h].h){
                tile_with_lowest_h =i
               }
            }

            var current = openList[tile_with_lowest_h ]
            if(current === tiles[ec][er]){
                path =path_f(current)            
                flag =1
                break;  
            }
           
            remove(openList,current)
            closedList.push(current)

           // var neighbors = current.neighbors
           var neighbors= addNeighbors(current,current.c,current.r)
            for(var i=0;i<neighbors.length;i++){               
                var neighbor = neighbors[i]

                if(!closedList.includes(neighbor) && neighbor.state != 'w' ){    // this means the neighbor has not been evaluated yet 
                var betterPath = false
                   
                    if(!openList.includes(neighbor)){
                        openList.push(neighbor)
                        
                        betterPath= true
                        
                    }
                    if(betterPath){
                        neighbor.h = weight * heuristic(neighbor,tiles[ec][er],heu)
                        neighbor.previous = current


                    }
                    
                }
                   
            }
            var time_e = new Date().getTime();

            
        }       
            
             
            
            if(flag === 0){
                console.log('No path exists')
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
                       // openSet[i].state ='b'
               }
                }
              
             i++
             
               
         }, 10)
        //  setTimeout(() => { clearInterval(timerId)}, closedList.length * 100);
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
   var len= length(path).toFixed(2)
//    setTimeout(() => { clearInterval(timerId1) }, closedList.length * 100);
   let timerId2= window.setInterval(function(){
     if(k=== path.length){
         k=0
         document.getElementById("outcome").innerHTML = `Length= ${len} <br> Time= ${(time_e-time_s).toFixed(3)}ms`;
         clearInterval(timerId2)
     }else{
        path[k].state='x'
        tiles[sc][sr].state='s'
        tiles[ec][er].state='f'
       // openSet[i].state ='b'

     }
    
        
   k++
   
     
}, (closedList.length*11)/(path.length))
// setTimeout(() => { clearInterval(timerId2)}, closedList.length * 100);


  }
}
