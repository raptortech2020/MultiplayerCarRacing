/*
ref - to point to an address
on - to read the value from database
set - update the value in the database
*/
var database;
var distance = 0;
var gameState = 0;
var playerCount = 0;
var game,player,form;
var allPlayers;
var cars, car1, car2, car3,car4 ;
var car1i , car2i ,car3i , car4i ,tracki , gndi ;

function preload(){
  
    car1i = loadImage("images/car1.png");
    car2i = loadImage("images/car2.png");
    car3i = loadImage("images/car3.png");
    car4i = loadImage("images/car4.png");
    tracki = loadImage("images/track.jpg");
    gndi = loadImage("images/ground.png");
}

function setup(){
    createCanvas(displayWidth - 20,displayHeight - 125);
    database = firebase.database();
    console.log(database)

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(255,255,255);

    
    if(playerCount === 4)
    {
        game.update(1);
    }
    if(gameState === 1)
    {
        clear();
        game.play();
    }

    if(gameState === 2)
    {
        game.end();
    }
   // drawSprites();
}

