




$(document).ready(function(){
    

    var grid = [['','',''],['','',''],['','','']];
    
    var PLAYER_TOKEN = null;
    var COMPUTER_TOKEN = null;
    var gameStarted = false;
    
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
    
    function printGrid(){
        for (var i = 0; i < grid.length; i++) {
            var e = grid[i];
            console.log(e);
        }
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
    
    
    
    function switchPlayer(player){
     if(player === PLAYER_TOKEN) {
         player = COMPUTER_TOKEN;
     }else{
         player = PLAYER_TOKEN;
     }
     return player;
    }
    
    function minimax(grid,depth,player){
     if (isGameOver(grid) === false) {
         var values = [];
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
                 
                 
    
             }
          }
    
          if(player === COMPUTER_TOKEN){  //return maximun for comp play
              var max = _.maxBy(values, function(v){
                  return  v.cost;
             });
             if(depth === 0){
                 return max.position;
             }else{
                 return max.cost;
             }
          }else{
               var  min = _.minBy(values, function(v){
                 return v.cost;
              });
              if(depth === 0){   //return postion at depth o
                  return min.position;
              }else{            // else return object for next use
                  return min.cost;
              }
          }
    
    
         
     }  else if (isGameOver(grid) === null){
         return 0; // for a draw
     } else if (isGameOver(grid) === PLAYER_TOKEN){
         return depth - 10;
     } else if (isGameOver(grid) === COMPUTER_TOKEN){
         return 10-depth;
     }
     return 0;
    }
    
    
    function aiMove(grid){
     return minimax(grid,0,COMPUTER_TOKEN);
    }
    

    

   

    
     $($("#gamebody>.introduce1>span").text("Welcome!!!")).fadeOut(3000, function(){
           
        $("#gamebody>.introduce1>span").html("click to play as <br> <span id="+"\"optionx\""+">X</span> \
        or <span id=" +"\"optiony\""+">O</span> , then Start").fadeIn(2000);
     }); 

     
        $("#gamebody>.introduce1>span").on('click', function(){
            $(this).fadeOut(2000,function(){
                $("#gamebody>.introduce1>span").html("Let's get started").fadeIn(2000);
            })
           

        });
     
     
 
       

        $("#gamebody>.introduce1>span").click(function(e){
         var txt = $(e.target).text();
          if(txt == 'X'){
              PLAYER_TOKEN = 'X';
              COMPUTER_TOKEN = 'O';
          }else{
            PLAYER_TOKEN = 'O';
            COMPUTER_TOKEN = 'X';
          }
          console.log("the computer token is "+ COMPUTER_TOKEN);
        });


       

        $("#buttonsdiv > .starter").click(function(){
            if(PLAYER_TOKEN == null){
                $("#gamebody>.introduce1>span").html("Please select a token").fadeOut(6000, function(){
                    $("#gamebody>.introduce1>span").html("click to play as <br> <span id="+"\"optionx\""+">X</span> \
                    or <span id=" +"\"optiony\""+">O</span> then Start").fadeIn(2000);
                });

            }
          else if(gameStarted == false && PLAYER_TOKEN != null){
            $("#gamebody>.introduce1>span").remove();

            $("#gamebody>.introduce1").append(

                "<table id="+"\"board\""+"> \
                        <tr> \
                         <td data-i="+0+" class="+"\"reload\""+" data-j="+0+"></td> \
                         <td data-i="+0+" data-j="+1+"></td> \
                         <td data-i="+0+" data-j="+2+"></td> \
                         </tr> \
                         <tr> \
                         <td data-i="+1+" data-j="+0+"></td> \
                         <td data-i="+1+" data-j="+1+"></td>  \
                         <td data-i="+1+" data-j="+2+"></td> \
                         </tr> \
                         <tr> \
                         <td data-i="+2+" data-j="+0+"></td> \
                         <td  data-i="+2+" data-j="+1+"></td> \
                         <td  data-i="+2+" data-j="+2+"></td> \
                         </tr> \
                                </table> "   
                            );
                            gameStarted = true;

          $('#board').on('click', 'tr td', function() {
            $(this).html(PLAYER_TOKEN);
            const i = $(this).data('i');
            const j = $(this).data('j');
            grid[i][j] = PLAYER_TOKEN;
            

            if(isGameOver(grid) !== false){
                console.log("now over o!!!");
                if(isGameOver(grid) === PLAYER_TOKEN){
                    $("#gamecontainer").prepend("<div id="+"\"winner\""+"> You won!!!! </div>")
                }
                else if (isGameOver(grid) === COMPUTER_TOKEN){
                    $("#gamecontainer").prepend("<div id="+"\"winner\""+"> You Lost!!!! </div>")
                }
                else if (isGameOver(grid) === null){
                    $("#gamecontainer").prepend("<div id="+"\"winner\""+"> Issa Draw!!!! </div>")
                }

               $("#gamebody>.introduce1").append("<div id="+"\"gameover\""+"> Game Over </div>");
                gameStarted = false;
                grid = [['','',''],['','',''],['','','']];
                $("#gamecontainer>#winner,#gamebody>.introduce1>#gameover").fadeOut(6000, function(){
                    $("#gamebody>.introduce1").html("<span>click <i>again</i> to select player token</span>").on('click',function(){
                        $("#gamebody>.introduce1>span").html("click to play as <br> <span id="+"\"optionx\""+">X</span> \
                        or <span id=" +"\"optiony\""+">O</span> , then Start").fadeIn(2000);
                    });
                    
                });
               
                

            }else{
               const compMove = aiMove(grid);
                grid[compMove.i][compMove.j] = COMPUTER_TOKEN;
               var field = $('[data-i='+compMove.i+'][data-j='+compMove.j+']');  
               field.append(COMPUTER_TOKEN);
               if(isGameOver(grid) !== false){
                if(isGameOver(grid) === PLAYER_TOKEN){

                    $("#gamecontainer").prepend("<div id="+"\"winner\""+"> You won!!!! </div>")
                }
                else if (isGameOver(grid) === COMPUTER_TOKEN){
                    $("#gamecontainer").prepend("<div id="+"\"winner\""+"> You Lost!!!! </div>")
                }
                else if (isGameOver(grid) === null){
                    $("#gamecontainer").prepend("<div id="+"\"winner\""+"> Issa Draw!!!! </div>")
                }
                   
                   console.log("now over o!!!");
                   $("#gamebody>.introduce1").append("<div id="+"\"gameover\""+"> Game Over </div>");
                   gameStarted = false;
                 //  $("#gamebody>.introduce1>#gameover").fadeOut(6000);
                   grid = [['','',''],['','',''],['','','']];

                   $("#gamecontainer>#winner,#gamebody>.introduce1>#gameover").fadeOut(6000, function(){
                    $("#gamebody>.introduce1").html("<span>click <i>again</i> to select player token</span>").on('click',function(){
                        $("#gamebody>.introduce1>span").html("click to play as <br> <span id="+"\"optionx\""+">X</span> \
                        or <span id=" +"\"optiony\""+">O</span> , then Start").fadeIn(2000);
                    });
                });
               }
            }
        });

    }
        });
     
       
           
});

