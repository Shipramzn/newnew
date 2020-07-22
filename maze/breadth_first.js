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
        var time= time_e-time_s
        closed(visited_elt,path)
        pathvisual(path,time,visited_elt)


    }else{
        console.log('Solution does not exist')
    }
}

