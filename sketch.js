var player, player_running
var ground
var obstaclesImage, obstaclesGroup 
var backg, backgImage
var score
var banana, bananasImage, bananasGroup


var PLAY = 2
var ONELIFE = 1
var END = 0
var gameState = PLAY


function preload(){
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png",  "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png",  "Monkey_10.png")
  
  obstaclesImage = loadImage("stone.png")
  bananasImage = loadImage("banana.png")
  backgImage = loadImage("jungle.jpg")
}

function setup(){
  createCanvas(500,400);
  text("Score: "+ score, 200,50);
  backg = createSprite(200, 200, 400, 400)
  
  backg.addImage(backgImage);
  score = 0
  
  player = createSprite(50, 350, 10, 10)
  player.addAnimation("running", player_running)
  player.scale = 0.1
  
  ground = createSprite(200,380,400,20);
  ground.visible = false
  
 
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  
  
  
}

function draw(){
 
  background(220)
  stroke("white")
  textSize(20)
  fill("white")
   text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
    

     if(keyDown("space") && player.y > 330) {
    player.velocityY = -15;
       
       
  }
  
  player.velocityY = player.velocityY + 0.5
 
  
  }
   backg.velocityX = -5
  if (backg.x < 0){
    backg.x = backg.width/2;
    
  }
  
if(obstaclesGroup.isTouching(player) && gameState === PLAY){
  player.scale = 0.05
  
  gameState = ONELIFE
  obstaclesGroup.destroyEach();
  player.collide(ground);
 
 
     
  
}
  
  if(obstaclesGroup.isTouching(player) && gameState === ONELIFE){
  backg.velocityX = 0
  player.velocityY = 0
   obstaclesGroup.setVelocityXEach(0)
   bananasGroup.setVelocityXEach(0)
   player.visible = false
   bananasGroup.setLifetimeEach(-1)
   obstaclesGroup.setLifetimeEach(-1)
}
  
  if(bananasGroup.isTouching(player)){
  player.scale = 0.1
    bananasGroup.destroyEach();
 score = score + 10
  gameState = PLAY
}
  
 player.collide(ground);
  if(keyDown("space") && player.y > 330) {
    player.velocityY = -15;
  }
player.velocityY = player.velocityY + 0.5
  
  backg.depth = score.depth;
    score.depth = score.depth + 1;
  
  drawSprites();
  spawnObstacles();
   spawnBananas();
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,350,80,80);
    obstacle.velocityX = -5
    obstacle.addImage(obstaclesImage)


    
        
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  if(frameCount % 120 === 0) {
    var banana = createSprite(600,250,80,80);
    banana.velocityX = -5
    banana.addImage(bananasImage)


        
    banana.scale = 0.03;
    banana.lifetime = 300;
  
    bananasGroup.add(banana);
  }
}

