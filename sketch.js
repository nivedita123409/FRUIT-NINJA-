//Declaration of variables
var bg, bg_img;
var sword,sword_img;
var inv1,inv2,inv3,inv4;
var fruit;
var boom_img,boom;
var blast_img, blast;
var happymoj,thumbmoj,kingmoj,happymoj_img,thumbmoj_img,kingmoj_img;
var screen_img,screen,
 lastscreen_img,lastscreen1;
var 
fruit1_img,fruit2_img,fruit3_img,fruit4_img,fruit5_img,fruit6_img,fruit7_img,fruit8_img;
var fruitGroup;
var Explosion;
var Explosion_img;
var enemyGroup, enemy;
var fruitninjalogo_img,fruitninjalogo;

//Scoring and losing system
var score;
var chances;

//Game States
var SERVE=2;
var PLAY=1;
var END=0;
var gameState=SERVE;

var score=0;

//Restart & gameOver 
var gameOver,gameOver_img;
var restart,restart_img;
var playbutton,playbutton_img;

//Sounds
var cutSound,bombSound;

function preload()
{
  //To load different images and sounds
  sword_img=loadImage("sword.png");
  bg_img=loadImage("fruitninja.png");
  screen_img=loadImage("screen1.jpg");
  lastscreen1_img=loadImage("last-screen.png");   
fruitninjalogo_img=loadImage("fruit-ninja-logo.png");
  
  //To load fruits image
  fruit1_img=loadImage("blueberry.png");
  fruit2_img=loadImage("banana.png");
  fruit3_img=loadImage("cherry.png");
  fruit4_img=loadImage("grapes.png");
  fruit5_img=loadImage("pineapple.png");
  fruit6_img=loadImage("raspberry.png");
  fruit7_img=loadImage("orange.png");
  fruit8_img=loadImage("strawberry.png");
  
  //to load emojis
  happymoj_img=loadImage("happy.png");
  thumbmoj_img=loadImage("thumbup.png");
  kingmoj_img=loadImage("king.png");
  
  //To load Explosion image
  Explosion_img=loadImage("blast.png");
  
  //To load gameOver image
  gameOver_img=loadImage("gameover.png");
  
  //To load restart image
  restart_img=loadImage("playagain.png");
  playbutton_img=loadImage("startb.png");
  boom_img=loadImage("boom.png");
  
  //To load sounds 
  cutSound=loadSound("cutsound.mp3");
  bombSound=loadSound("explosion-sound.wav");
}

function setup()
{
  //To create a canvas
  createCanvas(400,400);
  
  bg=createSprite(200,200);
  bg.scale=0.4;
  
  lastscreen1=createSprite(200,200);
  lastscreen1.scale=0.3;
  lastscreen1.addImage(lastscreen1_img);
  
  screen1=createSprite(200,200);
  screen1.scale=0.6;
  screen1.addImage(screen_img);
    
  //To create sword sprite and its properties
  sword=createSprite(200,200,10,10);
  sword.addImage(sword_img);
  sword.scale=0.2;
  sword.rotation=-13;
  //sword.debug=true;
sword.setCollider("rectangle", 0, 0, 40, 140, 40);
  
  //To create invisible boundaries to collide with sword
  inv1=createSprite(200,2,400,4);
  inv1.visible=false;
  inv2=createSprite(200,398,400,4);
  inv2.visible=false;
  inv3=createSprite(2,200,4,400);
  inv3.visible=false;
  inv4=createSprite(396,200,4,400);
  inv4.visible=false;
  
  //To create new Groups
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  //To assign initial value to score var
  score=0;
  //To assign initial value to chances
  chances=3;
  
  //To create GameOver sprite
  gameOver=createSprite(200,190,10,10);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.1;
  
  //To create restart sprite
  restart=createSprite(200,260,10,10);
  restart.addImage(restart_img);
  restart.scale=0.16;
  
  happymoj=createSprite(70,65,20,10);
  happymoj.addImage(happymoj_img);
  happymoj.scale=0.3;
  happymoj.visible=false;
    
  kingmoj=createSprite(70,70,20,10);
  kingmoj.addImage(kingmoj_img);
  kingmoj.scale=0.2;
  kingmoj.visible=false;
  
  thumbmoj=createSprite(70,60,20,10);
  thumbmoj.addImage(thumbmoj_img);
  thumbmoj.scale=0.1;
  thumbmoj.visible=false;

  boom=createSprite(200,100,10,10);
  boom.addImage(boom_img);
  boom.scale=0.1;
  
  fruitninjalogo=createSprite(200,110,10,10);
  fruitninjalogo.addImage(fruitninjalogo_img);
  fruitninjalogo.scale=0.61;
  //fruitninjalogo .visible=false;
    
  playbutton=createSprite(200,280,10,10);
  playbutton.addImage(playbutton_img);
  playbutton.scale=0.21;    
  //playbutton.visible=false;
}

function draw()
{
  bg.addImage(bg_img);
  //To assign a background to programme
  background("azure");

  drawSprites();
  
  console.log(gameState)

  if (gameState === SERVE) {
    //lastscreen.visible = false;
    lastscreen1.visible = false;
    //lastscreen2.visible = false;
    bg.visible = false;
    sword.visible = false;
    restart.visible = false;
    boom.visible = false;
    gameOver.visible = false;
    happymoj.visible=false;
    kingmoj.visible=false;
    thumbmoj.visible=false;


    //screen1.visible = true;
    fruitninjalogo.visible = true;
    playbutton.visible = true;
    //to change gamestate play
    if (mousePressedOver(playbutton)) {
      gameState = PLAY;
    }
  }
  
  if(gameState===PLAY)
  {
  
  //To display scores
  strokeWeight("3");
  stroke("purple");
  fill("pink");
  textSize(20);
  text("Score : "+score,170,30);
    
  //To display chances
  strokeWeight("3");
  stroke("yellow");
  fill("black");
  textSize(20);
  text("Chances : "+chances,15,30);
    
   //To make sword move along the mouse in all directions 
     sword.y=World.mouseY;
     sword.x=World.mouseX;
  
   //To collide sword with invisible boundaries
   sword.collide(inv1);
   sword.collide(inv2);
   sword.collide(inv3);
   sword.collide(inv4);
  
   //To call fruits and enemy function in draw()
   fruits();
   enemy();
    
   //To increase score when sword cuts fruits
   if(sword.isTouching(fruitGroup))
   {
     fruitGroup.destroyEach();
     score=score+2;
    //To add sound effect when knife cuts fruits
     cutSound.play();
     
   }
  
   //To decrease chances when sword touches ememy
   if(sword.isTouching(enemyGroup))
   {
     enemyGroup.destroyEach();
     chances=chances-1;
     bombSound.play();
   }
    happymoj.visible=false;
    kingmoj.visible=false;
    thumbmoj.visible=false;
   lastscreen1.visible=false;
   playbutton.visible=false;
   fruitninjalogo.visible=false; 
   screen1.visible=false;
   gameOver.visible=false;
   restart.visible=false; 
   boom.visible=false;
   bg.visible=true;
   sword.visible=true;

  } 
   else if(gameState===END)
  {
    gameState=SERVE;

    reset();
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    gameOver.visible=true;
    restart.visible=true;
    sword.visible=false;
    boom.visible=true;
    bg.visible=false;
    lastscreen1.visible=true;
    
    if (score<10&&score>21) {
    happymoj.visible = true;
    } 
    
     if (score<31&&score>20) {
     happymoj.visible=true;
     }
    
     if (score<51&&score>30) {
     thumbmoj.visible=true;
    }
    
     if (score<201&&score>100) {
     thumbmoj.visible=true;      
    }
    
     if (score<300&&score>250) {
     thumbmoj.visible=true;
     }

     if (score<450&&score>350) {
     kingmoj.visible=true;
     }

  strokeWeight("3");
  stroke("purple");
  fill("pink");
  textSize(20);
  text("Total Score : " + score, 120, 30);

    
  if(mousePressedOver(restart))
  {
    reset();
    score=0;
    chances=3;
    sword.visible=true;
  }
  }
  
  //End Condition
  if(chances===0)
  {
    gameState=END;

  }
  
  //To draw the sprites
  

}


function reset(){
    gameState=PLAY; 
    gameOver.visible=false;
    restart.visible=false;
    sword.visible=false;
    boom.visible=false;
    happymoj.visible=false;
    kingmoj.visible=false;
    thumbmoj.visible=false;

    fruitGroup.destroyEach();
    enemyGroup.destroyEach(); 
}

function fruits()
{
  //To make it visible after every 80 frames 
  if(World.frameCount%45===0)
  {
  //To create fruit sprite
  fruit=createSprite(380,200,20,20);
  //To switch between different fruits
  sf=Math.round(random(1,8));
  
  if(sf===1){
    fruit.addImage(fruit1_img); 
    fruit.scale=0.051;
  } 
  else if (sf===2){
    fruit.addImage(fruit2_img);
    fruit.scale=0.061;
  }
  else if(sf===3){
    fruit.addImage(fruit3_img);
    fruit.scale=0.11;
  }
  else if(sf===4){
    fruit.addImage(fruit4_img);
    fruit.scale=0.031;
  }
  else if(sf==5){
    fruit.addImage(fruit5_img);
    fruit.scale=0.2;
  }
  else if(sf===6){
    fruit.addImage(fruit6_img);
    fruit.scale=0.031;
  }
  else if(sf===7){
    fruit.addImage(fruit7_img);
    fruit.scale=0.031;
  }
  else if(sf==8){
    fruit.addImage(fruit8_img);
    fruit.scale=0.071;
  }
  //To place fruit randomly in vertical position
  fruit.y=Math.round(random(50,340));

  //To assign velocity to fruit
  fruit.velocityX=-4;
  //To assign lifetime to fruit to avoid memory leaks
  fruit.setLifetime=100;
  
  //To add fruit in fruitGroup
  fruitGroup.add(fruit);
  
  //To make fruit appear from both sides
  changefruit=Math.round(random(1,2))
  if(changefruit===1)
    {
      fruit.velocityX=-(7+score/4);
      fruit.x=400;
    }
    else if(changefruit===2)
    {
      fruit.velocityX=(7+score/4);
      fruit.x=0;
    }
  }
  
}

function enemy(){
  //To make enemy appear after every 150 frames
  if(World.frameCount%130===0)
  {
  //To create Explosion sprite
  Explosion=createSprite(400,200,10,10);
  Explosion.scale=0.1;
  //To place it randomly on y axis/vertical position
  Explosion.y=Math.round(random(50,350));
  //To add animation
  Explosion.addImage(Explosion_img);
  //To assign velocity to Explosion
  Explosion.velocityX=-5;
  //To assign lifetime to avoid memory leaks
  Explosion.setLifetime=125;
  //To add Explosion in enemyGroup
  enemyGroup.add(Explosion);
    
  //To make Explosion appear from both sides
  changeExplosion=Math.round(random(1,2));
  if(changeExplosion===1)
    {
      Explosion.velocityX=-(8+score/10);
      Explosion.x=400;
    }
    else if(changeExplosion===2)
    {
      Explosion.velocityX=(8+score/10);
      Explosion.x=0;
      
    }
  }
}