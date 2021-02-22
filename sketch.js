const Engine=Matter.Engine
const World=Matter.World
const Bodies=Matter.Bodies
var engine,world,a
var ground
var gameState="play"
var carGroup

function preload(){
bgimg=loadImage ("CityBackground.jpg")
manImage=loadAnimation("run.png")
c1=loadImage("Ycar.png")
c2=loadImage("Wcar.png")
c3=loadImage("ThinCar.png")
g1=loadImage("dumbg.png")
go1=loadImage("go.jpg")
a=loadImage("You Got Caught! real.png")

}



function setup() {
  createCanvas(displayWidth,displayHeight);
  bg=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
  bg.scale=0.5
  bg.addImage(bgimg)
  bg.velocityX=-2
 go=createSprite(displayWidth/2,displayHeight/2,10,10)
 go.addImage(go1)
 go.visible=false 
 ao=createSprite(displayWidth/2,displayHeight/2,10,10)
 ao.addImage(a)
 ao.visible=false
SpeedRunner=createSprite(displayWidth/2,displayHeight-150,20,100)
SpeedRunner.addAnimation("running",manImage)
SpeedRunner.scale=0.2     
SpeedRunner.debug=true
SpeedRunner.setCollider("circle",0,0,200)                                                       
ig=createSprite(displayWidth/2,displayHeight-100,displayWidth,10)
carGroup=new Group()
gaurdGroup=new Group()
}
function draw(){
background(0)
if (gameState==="play"){
if (bg.x<850){
  bg.x=displayWidth/2
}
if(keyDown("space")&&SpeedRunner.y>=displayHeight-250 ) {
  SpeedRunner.velocityY = -15;
}
  
SpeedRunner.velocityY = SpeedRunner.velocityY + 0.8

spawnGaurds();
if (carGroup.isTouching(SpeedRunner)){gameState="end"}

if (gaurdGroup.isTouching(SpeedRunner)){
  gameState='end1'
 // ao.visablle=true
}













spawnCars();

}
if (gameState==='end'){
  go.visible=true
  bg.velocityX=0
  carGroup.setVelocityXEach(0)     
SpeedRunner.velocityY=0
gaurdGroup.setVelocityXEach(0)
gaurdGroup.setLifetimeEach(-1)
carGroup.setLifetimeEach(-1)
}  
if (gameState==='end1'){
  ao.visible=true
  bg.velocityX=0
  carGroup.setVelocityXEach(0)     
SpeedRunner.velocityY=0
gaurdGroup.setVelocityXEach(0)
gaurdGroup.setLifetimeEach(-1)
carGroup.setLifetimeEach(-1)
}  
SpeedRunner.collide(ig)
drawSprites();   
}   
function spawnCars() {
  if(frameCount % 180 === 0) {
    var car = createSprite(displayWidth,displayHeight-100,10,40);
    //obstacle.debug = true;
    car.velocityX = -6;
    car.debug=true
    car.setCollider("rectangle",0,0,100,100)
    //generate random obstacles
    var rand = Math.round(random(1,3));
  
    switch(rand) {
      case 1: car.addImage(c1);
              break;
      case 2: car.addImage(c2);
              break;
      case 3: car.addImage(c3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    car.lifetime = 300;
    carGroup.add(car)
    //add each obstacle to the group
    
  }
}

function spawnGaurds() {
  if(frameCount % 120 === 0) {
    var Gaurds = createSprite(displayWidth,displayHeight-180,10,40);
    //obstacle.debug = true;
    Gaurds.velocityX = -6;
    Gaurds.scale=0.2
    //generate random obstacles
   
      Gaurds.addImage(g1);
      
    
    //assign scale and lifetime to the obstacle           
    
    Gaurds.lifetime = 300;
    gaurdGroup.add(Gaurds)
    //add each obstacle to the group
    
  }
}