var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pika,pika_running,pika_collided;
var ground, invisibleGround, groundImg;

var obstaclesGroup, squirtle, bulbasaur, charmander;

var score;
var gameOver, gameOverImg;

function preload(){
  pika_running = loadAnimation("pika1.png","pika2.png","pika3.png","pika4.png");
  pika_collided = loadImage("pika_collided.png");

  groundImg = loadImage("background.png");

  squirtle = loadImage("squirt.png");
  bulbasaur = loadImage("bulba.png");
  charmander = loadImage("char.png");

  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  createCanvas(600,200);

  pika = createSprite(50,180,20,20);
  pika.addAnimation("running", pika_running);
  pika.addImage("collided", pika_collided);
  //pika.scale = 0.5

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;

  gameOver = createSprite(300,100,60,10);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.visible = false

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false

  obstaclesGroup = createGroup();

  score = 0
}

function draw() {
  background(180);

  text("Score: "+ score, 500,50);

  if(gameState === PLAY){
    ground.velocity =-4;

  if(ground.x<0){
      ground.x=ground.width/2
    }
  if (keyDown("space") && pika.y>100){
    pika.velocityY = -13
  }

  pika.velocyY = pika.velocityY+0.8

  spawnObstacles();

  if(obstaclesGroup.isTouching(pika)){
    gameState = END;
  }
}
else if (gaemState = END){
  ground.velocityX = 0;

  obstaclesGroup.setVelocityEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  pika.changeAnimation("collided", pika_collided);
}
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6

    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addImage(bulbasaur);
              break;
      case 2: obstacle.addImage(charmander);
              break;
      case 3: obstacle.addImage(squirtle);
              break;
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

    gameOver.visible = true
  }

  pika.collide(invisibleGround);

  drawSprites();
}