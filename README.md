
# Shortest Pathfinder
The aim of this project is to find the shortest path between two points in 2D context. The algorithms which are being implemented in this project are the following:
- A*
- Dijkstra
- Best-First Search
- Breadth-first search
- IDA*

## Techstack:
Javascript ,HTML5 and CSS

## Project Link
https://shortest-path-git-master.ismians.vercel.app/maze/maze.html

## Code

- Grid.js file contains functions which are responsible for generating grid . It contains functions like reset() ,clear_path(), isDiagonal(), addNeighbors() etc.
- Path.js file contains functions like :- path_f() , length() and remove() 
- Heuristic.js contains functions for calculating heuristic distance
- Animation.js file contains functions for path visualisation

The project works on all the browsers (Chrome, Microsoft edge, Mozilla Firefox(version 64.0 64bit), Safari(macOS Sierra)). 

## Limitations

- For some cases IDA* does not show any path due to the time limit exceed.
- If page doesn't load properly refresh it.  
- The project is working on 64.0 64bit version of Firefox. On other versions UI will be displayed well . Moreover , the algos will work well but problem can be faced in drawing obstacles(smoothness in drawing).
- Due to unavailibility of Mac, project was tested on (https://app.lambdatest.com/console/realtime) with  macOS Sierra(OS).   

