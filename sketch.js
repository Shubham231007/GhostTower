var gameState = "PLAY";


var tower, towerimage;
var climber, climberimage, climbergroup;
var door, doorimage, doorgroup;
var ghost, ghostimage;
var iblock, iblockgroup;

function preload()
{
  towerimage = loadImage ("tower.png");
  climberimage = loadImage ("climber.png"); 
  doorimage = loadImage ("door.png");
  ghostimage = loadImage ("ghost-standing.png");
  
  
  
}


function setup()
{
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower",towerimage);
  tower.velocityY = 1;
  
  ghost = createSprite (200,200,50,50);
  ghost.addImage("ghost",ghostimage);
  ghost.scale = 0.5;
  
 doorgroup = new Group();
 climbergroup = new Group(); 
 iblockgroup = new Group();
  
  
}


function draw()
{
  background(0);
  
  if(gameState === "PLAY")
 {
       
     if(tower.y>400)
     {
     tower.y = 300;
     }
       
     if (keyDown("space"))  
       {
         ghost.velocityY = -10;
       }
   
   ghost.velocityY += 0.8;
   
   if(keyDown("left_arrow"))
     {
       ghost.x  -= 3
     }
   
   if(keyDown("right_arrow"))
     {
       ghost.x  += 3
     }
  
   if(climbergroup.isTouching (ghost))
     {
       ghost.velocityY = 0;
     }
   
   if(iblockgroup.isTouching (ghost)||ghost.y>600)
     {
       ghost.destroy();
       gameState = "END";
       
     }
   
    spwandoors();
  
    drawSprites();
   
 }
  
  if(gameState === "END")
  {
    fill("red")
    textSize(30)
    text("GAME OVER",230,250)
  }
  
  
  
  
  

 
}

function spwandoors()
{
  if(frameCount%240===0)
  {
    door = createSprite (200,-50);
    door.addImage(doorimage);
    
    climber = createSprite (200,10);
    climber.addImage(climberimage);
    
    
    iblock = createSprite(200,15); 
    iblock.width = climber.width; 
    iblock.height = 2;
    
 
    climber.velocityY = 1;
    climber.lifetime = 800;
   
    
    door.x = Math.round (120,400);
    climber.x = door.x
    door.velocityY = 1;
    
    door.lifetime = 800;
    
    iblock.velocityY = 1; 
    iblock.lifetime = 800; 
    iblockgroup.add(iblock); 
    iblock.debug = true;
    iblock.x = door.x;
    
    climbergroup.add(climber);
    
    doorgroup.add(door);
  }
}





