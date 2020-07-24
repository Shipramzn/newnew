Team name: The Ismians

Contributors:
1. Shipra Sharma(shipramzn7300@gmail.com)
2. Plaksha Singh(plakshasingh4@gmail.com)
3. Chesta Lathi (chestalathi2000@gmail.com)


ABOUT 
The aim of this project is to find the shortest path between two points in 2D context. The algorithms which are being implemented in this project are the following:
a) A*
b) Dijkstra
c) Best-First Search
d) Breadth-first search
e) IDA*

LANGUAGES USED:
Javascript ,HTML5 and CSS

FRAMEWORK:
None

The project code can be found on (https://github.com/Plaksha05/shortest_path.git) with an online demo at (https://shortest-path-git-master.ismians.vercel.app/maze/maze.html)

In this project, a 2D array stores the properties of each tile like state , g(cost) value, h(heuristic), parent, visited state etc. which are being accessed by the algorithms for implementation.

CODE:
Grid.js file contains functions which are responsible for generating grid . It contains functions like reset() ,clear_path(), isDiagonal(), addNeighbors() etc.
Path.js file contains functions like :- path_f() , length() and remove() 
Heuristic.js contains functions for calculating heuristic distance
animation.js file contains functions for path visualisation

UI:
The instructions button on the top-left is for info about how to start testing the project.
The symbols on the top-right are the color and picture encoding.
The bar of buttons on the bottom is for various operations listed under Instructions button.
Immediate to instructions button the length of the path and time used for algo will be displayed.

The project is working on all the browsers (Chrome, Microsoft edge, Mozilla Firefox(version 64.0 64bit), Safari(macOS Sierra)). 
Each algorithm have its own variables with local scope. Their scope will be vanished with the termination of the algo.

DOCUMENTS:
We have prepared short notes on algorithms (used in the project) and heuristic functions as well. These notes are in pdf format. 

DURATION:
1. 20june - 25june :- Understanding the functioning of the algos
2. 26june - 2july :- Learned languages (javascript, css and html)
Note:- We have also learned nodejs , ajax, json and express(for backend) but we were facing problem in using all these together to make the project.
3. 3july - 24july :- Project Preparation

LIMITATIONS:
1. For some cases IDA* does not show any path rather the site gets hung. This may be due to the time limit exceed. The rest algos are working well
2. If page doesn't load properly refresh it.  
3. The project is working on 64.0 64bit version of Firefox. On other versions UI will be displayed well . Moreover , the algos will work well but problem can be faced in drawing obstacles(smoothness in drawing). But other things work well on different versions of Firefox
4. Due to unavailibility of Mac, project was tested on (https://app.lambdatest.com/console/realtime) with  macOS Sierra(OS).   

DEPLOYMENT:
The project has been deployed on vercel.
