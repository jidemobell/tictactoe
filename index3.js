/*
var _ = require(newFunction());
function newFunction() {
    return 'lodash';
}
*/

var readlineSync = require('readline-sync');
var _ = require('lodash');

var grid = [['','',''],
            ['','',''],
            ['','','']];

const HUMAN_SELECT = 'x';
const AI_SELECT ='y';

function printGrid(){
    for (var i = 0; i < grid.length; i++) {
        var e = grid[i];
        console.log(e);
    }
}

function humanInput(){
   var i = readlineSync.question('your i value?');
   var j = readlineSync.question('your j value?');
    return {i:i,j:j}
}

function isBoardFull(grid){
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if(grid[i][j]===''){
                return false;
            }
            
        }
         
     }
     return true;
}

function verticalCheck(grid){
    for (var i = 0; i < grid.length; i++) {
        if((grid[i][0] != '') &&  (grid[i][0] == grid[i][1]) && (grid[i][1] == grid[i][2])){
              return grid[i][0];
        }
    }
    return false;
}

function horizontalCheck(grid){
    for (var j = 0; j < grid.length; j++) {
        if(grid[0][j] !='' && grid[0][j] == grid[1][j] && grid[1][j] == grid[2][j]){
              return  grid[0][j];
        }
    }
    return false;

}

function diagonalCheck(grid){
    if((grid[0][0] != '' &&
    grid[0][0] == grid[1][1] &&
    grid[1][1] == grid[2][2]) || 
       
    (grid[0][2] != '' &&
    grid[0][2] == grid[1][1] &&
    grid[1][1] == grid[2][0])
   ){
       return grid[1][1];
        }
    return false;
}



function isGameOver(grid){
     if(isBoardFull(grid) === true){
        return null;
    }

    else if(verticalCheck(grid) !== false){
        return verticalCheck(grid);
    }

    else if (horizontalCheck(grid) !== false) {
        return  horizontalCheck(grid);
    }

    else if (diagonalCheck(grid) !== false) {
        return diagonalCheck(grid);
    }

   return false;
}





function aiMove(){
    return minimax(grid,0,AI_SELECT);
}

function switchPlayer(player){
    if(player === HUMAN_SELECT) {
        player = AI_SELECT;
    }else{
        player = HUMAN_SELECT;
    }
    return player;
}


function possibleMoves(grid){
    var count = 0;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if(grid[i][j]==='') count++;
       }
    }
    return count;
}



function minimax(grid,depth,player){
    if (isGameOver(grid) === false) {
        const values = [];
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid.length; j++) {
               var gridCopy = _.cloneDeep(grid);
               if(gridCopy[i][j] !== '') continue;  //search for an available slot
               gridCopy[i][j] = player;  // AI places it as player and startes min max evaluation
               //he we evaluate minmax based on varying player and depths
               var value = minimax(gridCopy,depth+1,switchPlayer(player));
               values.push({
                   cost: value,
                   position: {
                    i: i,
                    j:j
                   }
                });  

                console.log(values);

            }
         }

         if(player === AI_SELECT){  //return maximun for comp play
            const max = _.maxBy(values, function(v){
              //  console.log("here is v.cost at max  "+ v);
                 return  v;
                 
            });
            if(depth === 0){
                return max.position;
            }else{
                return max.cost;
            }
         }else{
             const min = _.minBy(values, function(v){
              //  console.log("here is v.cost at min "+ v);
                return v;
             });
             if(depth === 0){   //return postion at depth o
                 return min.position;
             }else{            // else return object for next use
                 return min.cost;
             }
         }


        
    }  else if (isGameOver(grid) === null){
        return 0; // for a draw
    } else if (isGameOver(grid) === HUMAN_SELECT){
        return depth - 10;
    } else if (isGameOver(grid) === AI_SELECT){
        return 10-depth;
    }
    return 0;
}


var move = humanInput();
grid[move.i][move.j] = HUMAN_SELECT;
printGrid(grid);


var compMove = aiMove();
grid[compMove.i][compMove.j]  = AI_SELECT;
printGrid(grid); 


 move = humanInput();
grid[move.i][move.j] = HUMAN_SELECT;
printGrid(grid);


compMove = aiMove();
grid[compMove.i][compMove.j]  = AI_SELECT;
printGrid(grid);

move = humanInput();
grid[move.i][move.j] = HUMAN_SELECT;
printGrid(grid);  


compMove = aiMove();
grid[compMove.i][compMove.j]  = AI_SELECT;
printGrid(grid);  

//console.log(isGameOver(grid));
//console.log(minimax(grid,0,AI_SELECT));

//console.log(switchPlayer(HUMAN_SELECT));



