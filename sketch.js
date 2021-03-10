var Gamestate="play";
var hp
var backdrop
var backdropimg
var hpimg
var obstacleimg
var ObstaclesGroup 
var count=0;
var invisibleGround
var gameover

function preload(){
backdropimg = loadImage("backdrop.jpg")
hpimg= loadImage("hp.png")
obstacleimg= loadImage("Bludger.png")
}

function setup(){
createCanvas(windowWidth-50,windowHeight-50);
backdrop = createSprite(200,200,windowWidth-50,windowHeight-50);
backdrop.x = backdrop.width /2;
backdrop.addImage(backdropimg)
 gameover= createSprite(200,200,80,10);
gameover.scale=0.15;
hp = createSprite(100,300,80,30);
hp.addImage(hpimg)
hp.scale=0.25;
invisibleGround = createSprite(200,350,400,5);
invisibleGround.visible = false;
hp.setCollider("circle",10,0,80);
ObstaclesGroup = new Group();
textSize(18);
textFont("Georgia");
textStyle(BOLD);
}


function draw() {
  
   background("lightblue");
  if(Gamestate==="play"){
     gameover.visible=false
  backdrop.velocityX = -(6+count/25); 
   if (backdrop.x < 0){
      backdrop.x = backdrop.width/2;
    }
   count = count + Math.round(World.frameRate/40);
  
   if(keyDown("space")){
     hp.velocityY = -12 ;
    }
  hp.velocityY = hp.velocityY + 0.8;
  
  if(count===500){
    ObstaclesGroup.velocityX=-100;
  }
  spawnObstacles();
 if( ObstaclesGroup.isTouching(hp)){
   Gamestate="end";
 }
  }
 
 
else if(Gamestate==="end"){
 gameover.visible=true
backdrop.velocityX=0;
hp.velocityY=0;
ObstaclesGroup.setVelocityXEach(0);
ObstaclesGroup.setLifetimeEach(-1);

}

hp.collide(invisibleGround);
hp.collide(windowHeight);
  drawSprites();
   text("score:"+count,300,20);
}
function spawnObstacles() {
  if(World.frameCount % 40 === 0) {
    if(count===500){
      World.frameCount % 20 === 0;
       obstacle.velocityX = -10;
    }
    var obstacle = createSprite(400,random(100,350),10,40);
    obstacle.velocityX = -8;
   
    
    //generate random obstacles
    obstacle.addImage(obstacleimg)
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
   
  }
}
