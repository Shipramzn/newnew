
function search(set,g,threshold,heu){
    var cur = set[set.length-1]
    var f = g+ weight * heuristic(cur,tiles[ec][er],heu)
    if(f > threshold){
        return f
    }
    if(cur === tiles[ec][er]){
        return "FOUND"   
    }
    
    var min = Infinity
    var neighbors =addNeighbors(cur,cur.c,cur.r)
    for(var i=0;i<neighbors.length;i++){
        var neighbor= neighbors[i]

        if( !set.includes(neighbor) && neighbor.state != 'w'){
            set.push(neighbor)
           
           if(isDiagonal(cur,neighbor)){
                neighbor.g = cur.g + Math.SQRT2
                   
            }else{
               neighbor.g = cur.g +1
               
            } 
            //neighbor.g = cur.g +1

            var temp = search(set, neighbor.g,threshold,heu)
            if(temp == "FOUND"){
              return "FOUND"
            }
            if(temp < min){
                min = temp
            }
            set.pop()
        }
    } 
    return min
}
var set=[]     
var threshold 
var flag =0


function solve_using_idastar(heu){
    clear_path();
    

    set.push(tiles[sc][sr])
    threshold = weight * heuristic(tiles[sc][sr],tiles[ec][er],heu)
    var time_s = new Date().getTime();
    while(1){                                                 //infinite loop
        var temp = search(set,0,threshold,heu)
        if(temp == "FOUND"){
           
            flag=1
            console.log('Solution exists')
            break;
            
        }
        if(temp == Infinity){
            return [] 
        }
        threshold = temp
    }
    var time_e = new Date().getTime();


    if(flag == 0){
        console.log('Solution does not exists')
    }else{
        var len= length(set).toFixed(2)
        document.getElementById("outcome").innerHTML = `Length= ${len}  Time= ${(time_e-time_s).toFixed(3)}ms`;
        
        /*
        var j=0
        let timerId= window.setInterval(function(){     
            if(j=== set.length){
                j=0
            }else{
                set[j].state='x'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
            }        
            j++
        }, 10)
        setTimeout(() => { clearInterval(timerId); console.log('solution exists'); }, set.length * 20);*/
        for(var i=0;i<set.length;i++){
            set[i].state='x'
            tiles[sc][sr].state='s'
            tiles[ec][er].state='f'
        }
        set=[]
        
    }
    
}

