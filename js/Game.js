class Game
{
    constructor()
    {
    }  
    getState()
    {
     var gameStateRef = database.ref("gameState");
     gameStateRef.on("value",function(data)
     {
       gameState = data.val();
     })

 
    }

    update(state)
    {
     database.ref("/").update({
        gameState: state
     })
    }
 
   async start()
    {
      if(gameState === 0)
      {
          player = new Player();
          var playerCountRef = await database.ref("playerCount").once("value");
          if (playerCountRef.exists())
          {
            playerCount = playerCountRef.val();
            player.getCount();
          }
          
         
          form = new Form();
          form.display();
      }
      car1 = createSprite(100,200);
      car1.addImage("1",car1i);
      car2 = createSprite(300,200);
      car2.addImage("2",car2i);
      car3 = createSprite(500,200);
      car3.addImage("3",car3i);
      car4 = createSprite(700,200);
      car4.addImage("4",car4i);
      cars = [car1,car2,car3,car4];
      console.log(cars[0].x,cars[0].y);
      console.log(cars[1].x,cars[1].y);
      console.log(cars[2].x,cars[2].y);
      console.log(cars[3].x,cars[3].y);
      
    }
    
    play()
    {
      form.hide();
      var playButton = createButton("Move");
      playButton.position(displayWidth-100,600);
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      if( allPlayers !== undefined)
      {
       background("#C68767");
       image(tracki, 0,-displayHeight * 4, displayWidth, displayHeight * 5);
        //var displayPosition = 130;
       var index = 0;
       var x = 175;
       var y = 0;
        for(var plr in allPlayers)
        {
          index = index + 1;
          x = x + 200;
          y = displayHeight - allPlayers[plr].distance;
          cars[index - 1].x = x;
          cars[index - 1].y = y;
         
          if (index === player.index)
          {
            cars[index - 1].shapeColor = "red";
            fill("red");
            stroke(12);
            ellipse(x,y,60,60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index - 1].y;
          }
        }
        }
      
      if(keyDown(UP_ARROW)  && player.index !== null)
      {
        player.distance += 10;
        player.update();
      }
      playButton.mousePressed(()=>{
        player.distance += 50;
        player.update();       
      })
      /*playButton.mouseReleased(()=>{
        player.distance += 0;
        player.update();  
      })*/
      
      if(player.distance > 3800){       
        gameState = 2 ; 
        //update(gameState);
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
      //  text("Your Rank: "+ player.rank,displayWidth/2-50,displayHeight/2);
      }

      drawSprites();
    
    }

    end(){
      console.log("game ended");
      var message = createElement('h2');
      message.html("Congratulations!! "+ player.name +" Your rank is "+player.rank);
     message.position(displayWidth/2-150,displayHeight/4)
      
    }

}