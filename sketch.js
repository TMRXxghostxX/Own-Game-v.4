var player, playerImg;
var cop, copImg;
var track, trackImg;
var oil, oilImg;
var oilGp;
var fenceImg;
var fenceGp;
//gameState 0 = Play, gameState 1 = Gameover
var gameState = 0;
var score = 0;
var dieSound;
  
function preload(){
  playerImg=loadImage("Player.png");
  copImg=loadImage("Cop.png");
  trackImg=loadImage("track (2).jpg");
  oilImg=loadImage("Oil.png");
  fenceImg=loadImage("Fence(1).png");
  dieSound=loadSound("die.mp3");
  }
  
  
function setup() {
  createCanvas(400,600);
  track = createSprite(200,200,50,50);
  //oil = createSprite(300,-100,50,50);
  //oil.scale=0.30;
  player = createSprite(200,300,50,50);
  player.scale=0.45;
  cop = createSprite(200,575,50,50);
  cop.scale=0.45;
  player.addImage("Player",playerImg);
  cop.addImage("Cop",copImg);
  track.addImage("track",trackImg);
  //oil.addImage("oil",oilImg);
  oilGp = createGroup();
  fenceGp = createGroup();
} 
  
function draw() {
  background("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 200, 200);
  console.log(score);

  if(gameState===0){
score = score + Math.round(getFrameRate()/60);
      track.velocityY = (5 + 3*score/250);
  if(track.y>1000){
    track.y = 230;
  }
  
  if(keyDown("left")){
    player.x += -7;
  }
  if(keyDown("right")){
    player.x += 7;
  }
  cop.x = player.x;
  spawnOil();
  spawnFence();
  if(player.isTouching(oilGp)){
    player.y += 0.75;
  }
  if(fenceGp.isTouching(player)){
    gameState = 1;
    oilGp.destroyEach();
    fenceGp.destroyEach();
    dieSound.play();
  }
  if(player.isTouching(cop)){
    gameState = 1;    
    oilGp.destroyEach();
    fenceGp.destroyEach();
    dieSound.play();
  }
  }else if(gameState===1){
    track.velocityY = 0;
    oilGp.velocityY = 0;
    fenceGp.velocityY = 0;
    oilGp.lifetime = -1;
    fenceGp.lifetime = -1;
  }
console.log(gameState);
  drawSprites();
} 

function spawnOil() {
  if (frameCount % 95 === 0) {
    var oil = createSprite(Math.round(random(25, 375),-100,50,50));
    oil.velocityY = (5 + 3*score/250);
    oil.addImage("oil",oilImg);

    //assign scale and lifetime to the obstacle
    oil.scale=0.30;
    oil.lifetime = 130;
    player.depth += oil.depth;
    cop.depth += oil.depth;
    oilGp.add(oil);
  }}
function spawnFence(){
  if (frameCount % 160 === 0) {
    var fence = createSprite(Math.round(random(25, 375),-100,50,50));
    fence.velocityY = (5 + 3*score/250);

    fence.addImage("fence",fenceImg);

    //assign scale and lifetime to the obstacle
    fence.scale=0.90;
    fence.lifetime = 130;
    //player.depth += fence.depth;
    //cop.depth += fence.depth;
    fenceGp.add(fence);
}}