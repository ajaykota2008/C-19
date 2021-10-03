var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;
}

function draw() {
  background(200);
  if(gameState === "play"){

  
  if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors();

    if(keyDown("right")){
      ghost.x = ghost.x+3;
    }
    if(keyDown("left")){
      ghost.x = ghost.x-3;
    }
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY+0.8;

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();

  }
  if(gameState === "end"){
    textSize(30);
    fill ("red");
    stroke("black");
    text("Game Over",230,250);
  }
}
function spawnDoors(){
  if(frameCount %120 == 0){
   door = createSprite(200,50);
   door.addImage("door",doorImg);
   door.velocityY = 3;
   door.x = Math.round(random(120,400));
   door.lifetime = 800;
   doorsGroup.add(door);
   door.depth = ghost.depth;
   ghost.depth = ghost.depth+1;

   climber = createSprite(200,110);
   climber.addImage("climber",climberImg);
   climber.velocityY = 3;
   climber.x = door.x;
   climber.lifetime = 800;
   climbersGroup.add(climber);

   invisibleBlock = createSprite(200,110);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   invisibleBlock.velocityY = 3;
   invisibleBlock.x = door.x;
   invisibleBlock.lifetime = 800;
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.visible = false;
  }
}
