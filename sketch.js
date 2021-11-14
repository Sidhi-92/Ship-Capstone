var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipImg, helicopterImg, bombImg,gmoverImg;
var water, ship, helicopter, bomb;
var helicopterG, bombG;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipImg = loadAnimation("ship.png","ship2.png","ship.png");
  helicopterImg = loadImage("helicopter.png");
  bombImg = loadImage("bomb.png");
  gmoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(800, 450);
  
  ship = createSprite(100,240,30,30);
  ship.addAnimation("ship_sailing",shipImg);
  ship.scale=0.5;

  //creating water ground
  water=createSprite(40,320,700,50);
  water.addImage(waterbg);
  water.x=water.width/2;
  water.velocityX = -3;
 
  
  // creating groups 
  helicopterG=new Group();
  bombG=new Group();

  gameOver = createSprite(400,220,40,40);
  gameOver.addImage(gmoverImg);
  gameOver.scale=0.65;
  gameOver.visible=false;

  restart = createSprite(420,160,20,20);
  restart.addImage(restartImg);
  restart.scale= 0.1;
  restart.visible=false;
  
}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
   
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(getFrameRate()/60);
    water.velocityX = -3;

    if(keyCode === LEFT_ARROW){
      ship.x = ship.x-3; 
    }
    if(keyCode === RIGHT_ARROW){
      ship.x = ship.x+3; 
    }
    
    if(water.position.x < 300){
      water.position.x = 400;
    }
    
            
    //Call user defined function
    spawnHelicopter();
    spawnBomb();
    if(bombG.isTouching(ship)){
     gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    //water velocity becomes zero

    water.velocityX= 0;
    //destroy Helicopter group
    helicopterG.destroyEach();
    //destroy bomb group
    bombG.destroyEach();
    gameOver.visible=true;
    restart.visible=true;
    
    
    if(mousePressedOver(restart)){
      reset();
    }
    ship.destroy();
  }
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterImg);
    helicopter.setVelocity(-5,0);
    helicopter.scale = 0.5;
    helicopter.lifetime = 300;
    helicopterG.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if (frameCount % 200 == 0) {
  var bomb = createSprite(Math.round(random(50, 700)),80, 10, 10);
  bomb.addImage(bombImg);
  bomb.scale=0.12;
  bomb.velocityY = 2;
  bomb.lifetime = 150;
  bomb.depth = water.depth;
  bomb.depth=bomb.depth - 1;
  bombG.add(bomb);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible= false;
  helicopterG.destroyEach();
  bombG.destroyEach();
  //ship.destroy();
  score= 0;
}
/*function shipF(){
  //creating ship
  fill("yellow");
  textSize(15);
  text("Press Space to Play",350,250 );

  if(keyCode === 32){
  
}
}*/
