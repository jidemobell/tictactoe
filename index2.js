/*
var gamer = {
    gamerMode : function(div){
                $(div).click(function(){
                    $("#gamebody>.introduce1>span").text("let's get started").fadeIn(2000);
                });
    }
}  */

const PLAYER_TOKEN = 'X';
const PLAYER2_TOKEN = 'Z';
const COMPUTER_TOKEN = 'O';



$(document).ready(function(){

   var grid = [['','',''],['','',''],['','','']];



   var gameStarted = false;

   function verticalOver(){

    for (var i = 0; i < grid.length; i++) {
        if((grid[i][0] != null) &&  (grid[i][0] == grid[i][1]) && (grid[i][1] == grid[i][2])){
              
              if(grid[i][0] == PLAYER_TOKEN){
                  console.log("player one won!");
                  return true;
              }
              else if (grid[i][0] == COMPUTER_TOKEN){
                  console.log("player two won!");
                  return true;   
              }
              else if (grid[i][0] == PLAYER2_TOKEN) {
                  console.log("player three won!");
                  return true;
              }
        }else{
           // console.log("no winner yet at vertical");
            return false;
        }
    }
     
   }

   function horizontalOver(){
       //console.log("checking horizontal condition");
    for (var j = 0; j < grid.length; j++) {
        if(grid[0][j] != null &&
        grid[0][j] == grid[1][j] &&
        grid[1][j] == grid[2][j]){
            
              if(grid[0][j] == PLAYER_TOKEN){
                  console.log("player one won!");
                  return true;
              }
              else if (grid[0][j] == COMPUTER_TOKEN){
                  console.log("player two won!");
                  return true;   
              }
              else if (grid[0][j] == PLAYER2_TOKEN) {
                  console.log("player three won!");
                  return true;
              }
        }else{
           // console.log("no winner yet at horizontal");
            return false;
        }
    }
   }

   function diagonalOver(){
   // console.log("checking diagonal condition");
        if((grid[0][0] != null &&
        grid[0][0] == grid[1][1] &&
        grid[1][1] == grid[2][2]) || 
           
        (grid[0][2] != null &&
        grid[0][2] == grid[1][1] &&
        grid[1][1] == grid[2][0])
       ){
           
              if(grid[1][1] == PLAYER_TOKEN){
                  console.log("player one won!");
                  return true;
              }
              else if (grid[1][1] == COMPUTER_TOKEN){
                  console.log("player two won!");
                  return true;   
              }
              else if (grid[1][1] == PLAYER2_TOKEN) {
                  console.log("player three won!");
                  return true;
              }
        }
        else {
            return false;
        }
    
   }

   function isBoardFull(){
      for (var i = 0; i < grid.length; i++) {
         for (var j = 0; j < grid.length; j++) {
             if(grid[i][j]==''){
                 return false;
             }
             
         }
          
      }
      console.log("we have a tie!!");
      return true;

   }

   function isAnyEmpty(){
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if(grid[i][j]==''){
                return {
                i : i,
                j : j
                };
            }
            
        }
         
     }
    // return null;
   }


   function printGrid(){
       for (var i = 0; i < grid.length; i++) {
           var e = grid[i];
           console.log(e);
       }
   }

   function isGameOver(){
          // console.log("now checking");
         if(verticalOver() != false || horizontalOver() != false || diagonalOver() != false || isBoardFull() == false){
             return 1;
         }
         else{
             return -1;
         }
     }

   function isTokenChoice(){

   }


   

    
     $($("#gamebody>.introduce1>span").text("Welcome!!!")).fadeOut(2000,function(){
        $($("#gamebody>.introduce1>span").text("Please select a player mode")).fadeIn(2000);
    }); 

    //select player mode
    
    /*
     $('#buttonsdiv > .waves-effect').click(function(){
       
          if($(this).text() == 'One Player'){
          //  $("#gamebody>.introduce1>span").text("would you like to play as <br>'X' or 'Y'?");
          //  ($("#gamebody>.introduce1>span").text("let's get started")).fadeIn(3000);
            $("#buttonsdiv>.player1").text("Start Game");
          

          }else if ($(this).text() == 'Two Player'){
            $($("#gamebody>.introduce1>span").text("starting in two player mode")).fadeIn(3000);
          }
     });   
    */

    
     
    
     $("#buttonsdiv > .player1").click(function(){
      //   if($("#buttonsdiv > .player1").text() == "Start Game" && gameStarted == false){
        $("#gamebody>.introduce1>span").text("would you like to play as <br> <span id="+"\"optionx\""+">X</span> or <span id=" +"\"optiony\""+">Y</span>?");
   
            if( $("#gamebody>.introduce1>span"))
        
        console.log("I am in here first");
          
              console.log("I am in here");
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
        //  }
            
     //   while(gameStarted = true){
          $('#board').on('click', 'tr td', function() {
            //console.log("Clicked", this);
            
            $(this).html(PLAYER_TOKEN);
            const i = $(this).data('i');
            const j = $(this).data('j');
            grid[i][j] = PLAYER_TOKEN;

            console.log(printGrid());
            console.log(gameStarted);
           
            if(isGameOver() != 1){
                console.log("now over o!!!");
            }else{
                // AI move here
                console.log("not done here");
                const move = isAnyEmpty();
                grid[move.i][move.j] = COMPUTER_TOKEN;
                console.log(printGrid());
                console.log("I am  move i "+ move.i);
                console.log("I am  move j "+ move.j);
               var field = $('[data-i='+move.i+'][data-j='+move.j+']');  
               field.append(COMPUTER_TOKEN);
               if(isGameOver() != 1){
                   gameStarted = false;
                   console.log("now over o!!!");
               }
            }
        });
  //  }
     });  

     

    
});