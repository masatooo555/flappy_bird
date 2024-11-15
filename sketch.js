function updatePosition(entity) {
  entity.x += entity.vx;
  entity.y += entity.vy;
}

function createPlayer() {
  return {
    x: 200,
    y: 300,
    vx: 0,
    vy: 0
  };
}

function applyGravity(entity) {
  entity.vy += 0.15;
}

function applyJump(entity) {
  entity.vy = -5;
}

function drawPlayer(entity) {
  noStroke();
  fill("#ffb677");
  square(entity.x, entity.y, 40, 8);
}

function playerIsAlive(entity) {
  return entity.y < 600;
}

function blockIsAlive(entity) {
  return entity.x > -100;
}

function createBlock(y) {
  return {
    x: 900,
    y,
    vx: -2,
    vy: 0
  };
}

function drawBlock(entity) {
  noStroke();
  fill("#5f6caf");
  rect(entity.x, entity.y, 81, 400, 8);
}

function entitiesAreColliding(entityA, entityB, collisionXDistance, collisionYDistance) {
  let currentXDistance = abs(entityA.x - entityB.x);
  if (currentXDistance > collisionXDistance) return false;
  
  let currentYDistance = abs(entityA.y - entityB.y);
  if (currentYDistance > collisionYDistance) return false;
  
  return true;
}

let player = createPlayer();
let blocks;
let gameState;
let score;

function addBlockPair() {
  let y = random(-100, 100);
  blocks.push(createBlock(y));
  blocks.push(createBlock(y + 600));
}

function drawGameoverScreen() {
  background(0, 192);
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2);
  textSize(32);
  text("Score:" + score, width/2, height/2 + 80);
}

function resetGame() {
  gameState = "play";
  player = createPlayer();
  blocks = [];
  score = 0;
}

function updateGame() {
  if (gameState === "gameover") return;

  if (frameCount % 107 === 1) addBlockPair();
  blocks = blocks.filter(blockIsAlive);

  updatePosition(player);
  applyGravity(player);
  
  if (frameCount % 10 === 0) {
    score++;
  }
  
  

  for (let block of blocks) {
    updatePosition(block);

    if (entitiesAreColliding(player, block, 20 + 40, 20 + 200)) {
      gameState = "gameover";
      break;
    }
  }

  if (!playerIsAlive(player)) {
    gameState = "gameover";
  }
}

function drawGame() {
  background("#edf7fa");
  drawPlayer(player);
  for (let block of blocks) drawBlock(block);
  
  fill(0);
  textSize(32);
  text("Score: " + score, 10, 30);

  if (gameState === "gameover") drawGameoverScreen();
  
}

function onMousePress() {
  if (gameState === "play") {
    applyJump(player);
  } else if (gameState === "gameover") {
    resetGame();
  }
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  resetGame();
}

function draw() {
  updateGame();
  drawGame();
}

function mousePressed() {
  onMousePress();
}
