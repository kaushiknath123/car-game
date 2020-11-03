
var PLAY = 2;
var END = 0;
var START = 1;
var gameState = START;

var carImage, busImage, truckImage, postImage, carImage1, car, line2, line1, carx;
var gameOver, restart, gameOverImage, restartImage, obstacleGroup;

var sound;
var score, gameSound;


function preload() {
  //to load the obstacle and the car images
  carImage1 = loadImage("download.jpg");
  busImage = loadImage("bus.jpg");
  truckImage = loadImage("truck.png");
  carImage = loadImage("car 2.jpg")
  postImage = loadImage("pole.png");

  // to load the gameover and restart image
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");



}

function setup() {
  createCanvas(600, 600);

  line2 = createSprite(200, 300, 5, 600);
  line2.shapeColor = ("red");

  line1 = createSprite(400, 300, 5, 600);
  line1.shapeColor = ("red");

  car = createSprite(300, 500, 20, 20);
  car.addImage("running car", carImage);
  car.scale = 0.35;




  gameOver = createSprite(300, 260, 10, 10);
  gameOver.addImage("gameOverImage", gameOverImage);
  gameOver.visible = false;

  restart = createSprite(300, 300);
  restart.addImage(restartImage);
  restart.visible = false;

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  score = 0;

  obstacleGroup = createGroup();


}

function draw() {
  background("white");
  
  carx=Math.round(random(90, 490));
  car.setVelocity(0, 0);

  if (gameState === START) {
    textSize(40);
    fill("black");
    text("INSTRUCTIONS", 140, 30);
    textSize(20);
    fill("red");
    text("This is a car", 200, 80);
    text("press 'space' to start", 150, 110);
    text("save yourself from the other cars and posts", 50, 140);
    text("score the highest and win", 120, 170);
    textSize(20);
    text("ALL THE BEST", 200, 300);

    car.visible = false;
    line2.visible = false;
    line1.visible = false;
    score.visible = false;

    if (keyDown("space")) {
      gameState = PLAY;
      car.visible=true;
      line2.visible = true;
      line1.visible = true;
      score.visible = true;

      
    }
  }

  if (gameState === PLAY) {
    spawnCar2();
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("LEFT_ARROW")) {
      car.velocityX = car.velocityX - 5
    }
    if (keyDown("RIGHT_ARROW")) {
      car.velocityX = car.velocityX + 5
    } else if (obstacleGroup.isTouching(car)) {
      gameState = END;
    }
    fill("blue");
    textSize(30);
    text("score:" + score, 240, 590);
    console.log("gameState");

  }
  if (gameState === END) {
    obstacleGroup.destroyEach();
    obstacleGroup.setLifetimeEach(-1);
    line1.visible=false;
    line2.visible=false;
    car.visible=false;

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      gameState = START;
      gameOver.visible=false;
      restart.visible=false;
      if(keyDown("space")){
        gameState = PLAY;
      }
    }


  }

  fill("blue");
  textSize(30);
  text("score:" + score, 240, 590);



  drawSprites();


}

function spawnCar2() {
  if (frameCount % 160 === 0) {
    var car2 = createSprite(carx, -200, 20, 20);
    car2.velocityY = 6;
    //car2.x=(100, 300, 500);
    

    var r = Math.round(random(1, 4));
    switch (r) {
      case 1:
        car2.addImage(carImage1);
        break;
      case 2:
        car2.addImage(busImage);
        break;
      case 3:
        car2.addImage(truckImage);
        car2.scale=0.25;
        break;
      case 4:
        car2.addImage(postImage);
        break;
      default:
        break;
    }
    car2.scale = 0.5;
    obstacleGroup.add(car2);
    car2.lifetime = 300;

  }
}