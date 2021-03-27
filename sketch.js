var path,mainCyclist,pinkCyclist,yellowCyclist,redCyclist,ob1,ob2,ob3,gameover;
var pathImg,mainRacerImg1,mainRacerImg2,opp1,opp2,opp3,ob1Img,ob2Img,ob3Img,gameoverImg,bellsound;
var pinkCG,yellowCG,redCG,pink,yellow,red;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  
  pathImg=loadImage("images/Road.png");
  mainRacerImg1=loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2=loadAnimation("images/mainPlayer3.png");
  opp1=loadAnimation("opponent1.png","opponent2.png");
  opp2=loadImage("opponent4.png","opponent5.png");
  opp3=loadImage("opponent7.png","opponent8.png");
  ob1Img=loadAnimation("obstacle1.png");
  ob2Img=loadAnimation("obstacle2.png");
  ob3Img=loadAnimation("obstacle3.png");
  pink=loadAnimation("opponent3.png");
  yellow=loadAnimation("opponent6.png");
  red=loadAnimation("opponent9.png");
  gameoverImg=loadAnimation("gameOver.png")
  bellsound=loadSound("sound/bell.mp3")
}

function setup(){
  
  createCanvas(700,300);
  
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  
  //creating boy running
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  
  gameover = createSprite(350,150);
  gameover.addAnimation("gameOver.png",gameoverImg);
  gameover.scale=0.7;
  
  
  pinkCG=new Group();
  yellowCG=new Group();
  redCG=new Group();
  ob1G=new Group();
  ob2G=new Group();
  ob3G=new Group();

  
  mainCyclist.setCollider("rectangle",0,0,40,40);
  mainCyclist.debug = false;
} 
  
function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    
  gameover.visible = false;  
  
  mainCyclist.y = World.mouseY;
  distance = distance + Math.round(getFrameRate()/50);
  path.velocityX = -(6 + 2*distance/150);  
  
  edges= createEdgeSprites();
  mainCyclist.collide(edges);  
  
  //code to reset the background
  if(path.x < 0 ){
  path.x = width/3;
    
  }
    
  if (keyDown("space")){
  bellsound.play();
    
  }
  
    var select_oppPlayer = Math.round(random(1,4));
    
  if(World.frameCount % 150 == 0){
    
    if(select_oppPlayer == 1){
      PinkCyclist();
    }
 
    if(select_oppPlayer == 2){
      YellowCyclist();
    } 
  
    if(select_oppPlayer == 3){
      RedCyclist();
    }
  
    if(select_oppPlayer == 5){
      obstacle1();
    }
 
    if(select_oppPlayer == 6){
      obstacle2();
    }
 
    if(select_oppPlayer == 4){
      obstacle3();
    }
  }  
    
  if(mainCyclist.isTouching(pinkCG)){
    gameState = END;
    pinkCyclist.velocityY = 0;
    pinkCyclist.addAnimation("opponentPlayer1",pink);
    
  }else if(mainCyclist.isTouching(yellowCG)){
    gameState = END;
    yellowCyclist.velocityY = 0;
    yellowCyclist.addAnimation("opponentPlayer2",yellow);
    
  }else if(mainCyclist.isTouching(redCG)){
    gameState = END;
    redCyclist.velocityY = 0;
    redCyclist.addAnimation("opponentPlayer3",red);
    
  }else if(mainCyclist.isTouching(ob1G)){
    gameState = END;
    
  }else if(mainCyclist.isTouching(ob2G)){
    gameState = END;
    
  }else if(mainCyclist.isTouching(ob3G)){
    gameState = END;
    
  }   
  
  }else if(gameState===END){
     
     gameover.visible = true;  
     text("press up arrow to restart the game!",200,190 );
     
     path.velocityX = 0;
     mainCyclist.velocityY = 0;
     mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
    
    
    
     
     //pinkCG.destroyEach();
     pinkCG.setVelocityXEach(0);
     pinkCG.setLifetimeEach(-1);
     
     //yellowCG.destroyEach();
     yellowCG.setVelocityXEach(0);
     yellowCG.setLifetimeEach(-1);
     
     //redCG.destroyEach();
     redCG.setVelocityXEach(0);
     redCG.setLifetimeEach(-1);
     
     ob1G.destroyEach();
     ob1G.setVelocityXEach(0);
     ob1G.setLifetimeEach(-1);
     
     ob2G.destroyEach();
     ob2G.setVelocityXEach(0);
     ob2G.setLifetimeEach(-1);
     
     ob3G.destroyEach();
     ob3G.setVelocityXEach(0);
     ob3G.setLifetimeEach(-1);
     
    if(keyDown("UP_ARROW")){
     reset();
  }  
   }
}
  
function PinkCyclist(){
  
  pinkCyclist = createSprite(700,Math.round(random(70,250)));
  pinkCyclist.addAnimation("opponent1,opponent2",opp1);
  pinkCyclist.scale=0.06;
  pinkCyclist.setLifetime=170;
  pinkCyclist.velocityX = -(6 + 2*distance/150);
  pinkCG.add(pinkCyclist);
} 

function YellowCyclist(){
  
  yellowCyclist = createSprite(700,Math.round(random(100,250)));
  yellowCyclist.addAnimation("opponent4,opponent5",opp2);
  yellowCyclist.scale=0.06;
  yellowCyclist.setLifeyime=170;
  yellowCyclist.velocityX = -(6 + 2*distance/150);
  yellowCG.add(yellowCyclist);
}

function RedCyclist(){
  
  redCyclist = createSprite(700,Math.round(random(130,250)));
  redCyclist.addAnimation("opponent7,opponent8",opp3);
  redCyclist.scale=0.06;
  redCyclist.setLifeyime=170;
  redCyclist.velocityX = -(6 + 2*distance/150);
  redCG.add(redCyclist);
}

function obstacle1(){
  
  ob1 = createSprite(700,Math.round(random(130,250)));
  ob1.addAnimation("obstacle1",ob1Img);
  ob1.scale=0.1;
  ob1.setLifeyime=170;
  ob1.velocityX = -(6 + 2*distance/150);
  ob1G.add(ob1);
}

function obstacle2(){
  
  ob2 = createSprite(700,Math.round(random(130,250)));
  ob2.addAnimation("obstacle2",ob2Img);
  ob2.scale=0.1;
  ob2.setLifeyime=170;
  ob2.velocityX = -(6 + 2*distance/150);
  ob2G.add(ob2);
}

function obstacle3(){
  
  ob3 = createSprite(700,Math.round(random(130,250)));
  ob3.addAnimation("obstacle3",ob3Img);
  ob3.scale=0.1;
  ob3.setLifeyime=170;
  ob3.velocityX = -(6 + 2*distance/150);
  ob3G.add(ob3);
}

function reset(){
  
  gameState = PLAY;
  gameover.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}
