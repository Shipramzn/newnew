function solveMaze(){
    var openSet=[]
   var closedSet=[]
   var start
   var end
   var flag=0
   var path=[]
   var winner
   var current
    start = tiles[0][0]
    end = tiles[tileColumn-1][tileRow-1]
    
    openSet.push(start)
    
    while(openSet.length >0){
       
            winner =0    
            for(var i=0;i<openSet.length;i++){
               if(openSet[i].f < openSet[winner].f){
                   winner =i
               }
            }

            current = openSet[winner]
            if(current === end){
                
                path =[]
                var temp = current
                path.push(temp)
                while(temp.previous){
                 path.push(temp.previous)
                 temp = temp.previous
                }

                //Find the path
                
                flag =1
                //noLoop()
               // console.log('DONE!')
                break;
                
            }
            for(var i=openSet.length-1;i>=0;i--){
                if(openSet[i] == current){
                    openSet.splice(i,1)
                }
            }
            //removeFromArray(openSet,current)
            closedSet.push(current)

            var neighbors = current.neighbors
            for(var i=0;i<neighbors.length;i++){               
                var neighbor = neighbors[i]

                if(!closedSet.includes(neighbor) && neighbor.state != 'w'){    // this means the neighbor has not been evaluated yet 
                    var tempG = current.g +1
                    if(openSet.includes(neighbor)){  
                        if(tempG < neighbor.g){
                            neighbor.g = tempG   // to get the better g 
                        }
                    }else{
                        neighbor.g = tempG
                        openSet.push(neighbor)
                    }

                    var dx = Math.abs(neighbor.i - end.i)
                    var dy = Math.abs(neighbor.j - end.j)
                     neighbor.h = dx+dy
                     //heuristic(neighbor,end)
                     neighbor.f = neighbor.g + neighbor.h      // f corresponds to fitness number
                     neighbor.previous = current

                }
                   
            }
            
            for(var i=0;i<closedSet.length;i++){
                // console.log(closedSet[i])
                 closedSet[i].state='b'
             }
             
         
            

            }
            if(flag === 0){
                console.log('No solution exists')
            }else{
               console.log('Solution exists')
                for(var i=0;i<path.length;i++){
                    path[i].state='x'
                }

            }
               


        }
    
        



















