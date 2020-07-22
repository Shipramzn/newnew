function solve_using_bfs(){
    clear_path();
    var set =[]
    var visited_elt=[]                // to store visited elements
    var  flag =0
    var path=[]
    var time_s = new Date().getTime();
    set.push(tiles[sc][sr])
    tiles[sc][sr].visited = true
    while(set.length>0){  
        var cur = set[0]
        set.shift()
        visited_elt.push(cur)
        if(cur == tiles[ec][er]){
            flag =1
            path =path_f(cur)
            break;  
        }
        var neighbors = addNeighbors(cur,cur.c,cur.r)
        for(var i=0;i<neighbors.length;i++){
            var neighbor = neighbors[i]
            if(neighbor.visited === false && neighbor.state!== 'w'){
                set.push(neighbor)
                neighbor.previous = cur
                neighbor.visited= true
            }
        }
    }
    var time_e = new Date().getTime();

    if(flag ===1)
    {  
        var i=0
        var j=0
        path.reverse()
        
        let timerId= window.setInterval(function(){
            if(i === visited_elt.length){
                i=0
            }else{
                if(!path.includes(visited_elt[i])){
                    visited_elt[i].state='p'
                    tiles[sc][sr].state='s'
                    tiles[ec][er].state='f'
                }
            }
            i++
        }, 10)

        var len= length(path).toFixed(2)

        setTimeout(() => { clearInterval(timerId); console.log('solution exists'); }, visited_elt.length * 20);
        let timerId1= window.setInterval(function(){
            if(j=== path.length){
                j=0
                document.getElementById("outcome").innerHTML = `Length= ${len} <br> Time= ${(time_e-time_s).toFixed(3)}ms`;

                // break

            }else{
                path[j].state='x'
                tiles[sc][sr].state='s'
                tiles[ec][er].state='f'
            }       
            j++
        }, (visited_elt.length * 11)/(path.length))
        setTimeout(() => { clearInterval(timerId1); console.log('solution exists'); }, visited_elt.length * 20);

    }else{
        console.log('Solution does not exist')
    }
}

