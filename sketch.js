var backgroundImg,bg,backGroundSound;
var spaceShip,spaceShipImg;
var meteorImg,meteor
var star,starImg;
var ufo,ufoImg;


var score = 0 

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var starsGroup;
var meteorsGroup;
var ufosGroup;

var gameOver,gameOverImg,gameOverSound;
var restart,restartImg;





function preload(){
backGroundImg = loadImage("assest/backGround.png");
spaceShipImg = loadImage("assest/spaceShip4.png");
meteorImg = loadImage("assest/meteor4.png");
starImg = loadImage("assest/star2.png")
gameOverImg = loadImage("assest/gameOver2.png")
restartImg = loadImage("assest/restart.png")
ufoImg = loadImage("assest/UFO 2.png");

gameOverSound = loadSound("sfx-defeat7.mp3");
backGroundSound = loadSound("backGroundSon.mp3")
}

function setup(){
createCanvas(windowWidth,windowHeight);
//backgroundImg.scale = 0.5;




bg = createSprite(windowWidth/2,windowHeight/2,50,50);
bg.addImage(backGroundImg);
bg.velocityY+=5;
bg.scale = 3.2;

spaceShip = createSprite(windowWidth/2,windowHeight-120,50,50);
spaceShip.addImage(spaceShipImg);
spaceShip.scale = 0.25
//spaceShip.debug = true
spaceShip.setCollider("circle",0,0,300)


gameOver = createSprite(windowWidth/2,windowHeight/2-100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.4; 



restart = createSprite(windowWidth/2,windowHeight/2+150);
restart.addImage(restartImg);
restart.scale = 0.25;



starsGroup = new Group();
meteorsGroup = new Group();
ufosGroup = new Group();


}


function draw(){
 // background(0);
 

 
 
      if(gameState === PLAY){
        if(bg.y>500){
          bg.y=bg.width/2;
        }

          if(keyIsDown(RIGHT_ARROW)){
            spaceShip.position.x +=5
          }
          
          if(keyIsDown(LEFT_ARROW)){
             spaceShip.position.x -=5
          }
   
          
          if(spaceShip.isTouching(meteorsGroup)){
          gameState = END;
          gameOverSound.play()
          }



          bg.velocityY = (6 + 2*score/100);
          meteorsGroup.setVelocityYEach(6 + 1*score/100);
          starsGroup.setVelocityYEach(6 + 1*score/100);

          gameOver.visible = false;
         restart.visible = false;

         backGroundSound.play();

          spawnstars();
         spawnmeteors();
         spawnufo

         score = score + Math.round(getFrameRate()/60);

         
      }
      else if(gameState === END){
        bg.velocityY = 0;

        meteorsGroup.setVelocityYEach(0);
        starsGroup.setVelocityYEach (0);
        ufosGroup.setVelocityYEach(0);

        meteorsGroup.destroyEach();
        starsGroup.destroyEach();
        ufosGroup.destroyEach();

        
      

        if(mousePressedOver(restart)) {
          reset();
        }

        gameOver.visible = true;
        restart.visible = true;

       
        


        
      }

      
      drawSprites();

      fill("white")
 strokeWeight(10);
 stroke("yellow")
  textSize(50);
 text("Score:"+score,windowWidth/2+450,windowHeight-600);
 
}

function spawnstars() {
  
  if (frameCount % 100 === 0) {
    var  star = createSprite(700,-100)
      star.addImage(starImg);
     star.scale=0.2;
      star.x=Math.round(random(80,1400));
      star.velocity.y=+5
     
      star.depth = spaceShip.depth;
      spaceShip.depth = spaceShip.depth -5;

      starsGroup.add(star);
      
    }
  }
  
  function spawnmeteors(){
    if (frameCount % 30 === 0) {
      var  meteor = createSprite(700,-100)
        meteor.addImage(meteorImg);
       meteor.scale=0.5;
        meteor.x=Math.round(random(70,1400));
        meteor.velocity.y=+5
      

        spaceShip.depth = meteor.depth;
        spaceShip.depth = spaceShip.depth +1;

        meteorsGroup.add(meteor);
      }
  }

  function spawnufo(){
    if (frameCount % 30 === 0) {
      var  ufo = createSprite(700,-100)
        ufo.addImage(ufoImg);
       ufo.scale=0.5;
        ufo.x=Math.round(random(70,1400));
        ufo.velocity.y=+5
      

        spaceShipdepth =  ufo.depth;
        spaceShip.depth = spaceShip.depth +1;

        ufosGroup.add(ufo);
      }
  }
  
  function reset(){
    gameState = PLAY;
    bg.velocityY +=5
    gameOver.visible = false;
    restart.visible = false;
    
  
    score = 0
  }
