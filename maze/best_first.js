
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
           
            
        }                    
            var time_e = new Date().getTime();
            if(flag === 0){
                console.log('No path exists')
            }else{
                
                var time= time_e-time_s
                closed(closedList,path)
                open(openList,closedList,path)
                pathvisual(path,time,closedList)

  }
}
