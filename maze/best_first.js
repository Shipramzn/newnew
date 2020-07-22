
function solve_using_bestfirst(heu){
    clear_path();
    var openSet=[]
   var closedSet=[]
   var flag=0
   var path=[]
    //start = tiles[0][0]
    //end = tiles[tileColumn-1][tileRow-1]
    
    openSet.push(tiles[sc][sr])

    var time_s = new Date().getTime();
    
    while(openSet.length >0){
       
           var winner =0    
            for(var i=0;i<openSet.length;i++){
                openSet[i].h =  weight * heuristic(openSet[i],tiles[ec][er],heu)
                openSet[winner].h =  weight * heuristic(openSet[winner],tiles[ec][er],heu)
               if(openSet[i].h < openSet[winner].h){
                   winner =i
               }
            }

            var current = openSet[winner]
        
            if(current === tiles[ec][er]){
                
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

           // var neighbors = current.neighbors
           var neighbors= addNeighbors(current,current.c,current.r)
            for(var i=0;i<neighbors.length;i++){               
                var neighbor = neighbors[i]

                if(!closedSet.includes(neighbor) && neighbor.state != 'w' ){    // this means the neighbor has not been evaluated yet 
                var newPath = false
                   
                    if(!openSet.includes(neighbor)){
                        openSet.push(neighbor)
                        
                        newPath=true
                        
                    }
                    if(newPath){
                        neighbor.h = weight * heuristic(neighbor,tiles[ec][er],heu)
                        neighbor.f =  neighbor.h      // f corresponds to fitness number
                        neighbor.previous = current


                    }
                    
                }
                   
            }
            var time_e = new Date().getTime();

            
        }       
            
             
            
            if(flag === 0){
                console.log('No solution exists')
            }else{
                console.log('Solution exists')
              
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
                       // openSet[i].state ='b'
               }
                }
              
             i++
             
               
         }, 10)
         setTimeout(() => { clearInterval(timerId); console.log('solution exists'); }, closedSet.length * 100);
         let timerId1= window.setInterval(function(){
          
           if(j === openSet.length){
               j=0
           }else{
            if(!path.includes(openSet[j])){
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
                openSet[j].state ='l'
             }
           }
           
            
   
       j++
       
         
   }, (closedSet.length*11)/(openSet.length))
   var len= length(path).toFixed(2)
   setTimeout(() => { clearInterval(timerId1); console.log('solution exists'); }, closedSet.length * 100);
   let timerId2= window.setInterval(function(){
     if(k=== path.length){
         k=0
         document.getElementById("outcome").innerHTML = `Length= ${len} <br> Time= ${time_e-time_s}ms`;

     }else{
        path[k].state='x'
        tiles[sc][sr].state='s'
        tiles[ec][er].state='f'
       // openSet[i].state ='b'

     }
    
        
   k++
   
     
}, (closedSet.length*11)/(path.length))
setTimeout(() => { clearInterval(timerId2); console.log('solution exists'); }, closedSet.length * 100);


  }
}
