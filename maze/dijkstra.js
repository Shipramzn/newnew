
function solve_using_dijkstra(){ 
    clear_path();
    var set=[]            // to store examined elements
    var path =[]
    var num=53*23          // grid dimensions
    var flag =0
    tiles[sc][sr].distance = 0       //initialising start distance to be 0
    var time_s = new Date().getTime();
    
    while(num>0){
        var min = Infinity
        for(var i=0;i<tileColumn;i++){
            for(var j=0;j<tileRow;j++){
                
                if(tiles[i][j].distance < min   && tiles[i][j].visited === false){
                    min = tiles[i][j].distance
                    cur = tiles[i][j]
                }
            }
        }
        cur.visited=true
        set.push(cur)
        if(cur == tiles[ec][er]){              //if destination is found
            flag =1;
            path =path_f(cur)
            break;                            //then break
        }
        var neighbors= addNeighbors(cur,cur.c,cur.r)
        for(var i=0;i<neighbors.length;i++){
            var neighbor = neighbors[i]
            if(neighbor.visited === false && neighbor.state!='w'){
                var temp = neighbor.distance
                if(isDiagonal(neighbor,cur)){
                    if(temp <  cur.distance+Math.sqrt(2)){
                        neighbor.distance = temp
                    }else{
                        neighbor.distance=cur.distance+Math.sqrt(2)
                        neighbor.previous = cur
                    }
                }else{
                    if(temp <  cur.distance+1){
                        neighbor.distance = temp
                    }else{
                        neighbor.distance=cur.distance+1
                        neighbor.previous = cur
                    }  
                }
            } 
        }
        num--  
    }
    var time_e = new Date().getTime();

    if(flag == 1){
        var i=0
        var j=0
        path.reverse()
        let timerId= window.setInterval(function(){
            if(i=== set.length){
                i=0
            }else{
                if(!path.includes(set[i])){
                    set[i].state='p'
                    tiles[sc][sr].state='s'
                    tiles[ec][er].state='f'
                }
            }
            i++
        }, 10)
        var len= length(path).toFixed(2)

        setTimeout(() => { clearInterval(timerId); console.log('solution exists'); }, set.length * 20);
        let timerId1= window.setInterval(function(){
            if(j=== path.length){
                j=0
                document.getElementById("outcome").innerHTML = `Length= ${len} <br> Time= ${(time_e-time_s)}ms`;

            }else{
                path[j].state='x'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
            }
            j++;   
        }, (set.length * 11)/(path.length))
        setTimeout(() => { clearInterval(timerId1); console.log('solution exists'); }, set.length * 20);
    }else{
        console.log('solution does not exist')
    }
}

function isDiagonal(a,b){                    // function to find diagonal neighbor
    if(Math.abs(a.c-b.c) === 1 && Math.abs(a.r - b.r) === 1){
        return true;
    }else{
        return false
    }
}
 
