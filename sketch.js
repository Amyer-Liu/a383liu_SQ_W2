// ============================================================
// Week 2 Example 1: Movement, Gravity, and Collision
// ============================================================

// ------------------------------------------------------------
// THE PLAYER OBJECT
// An object groups related data together in one place.
// Instead of separate variables (playerX, playerY, playerVX...),
// we store everything about the player in one object.
// ------------------------------------------------------------
 
let player = {
  x: 200,
  y: 100,
  vx: 0,
  vy: 0,
  w: 72,       
  h: 56,       
  speed: 0.5,
  maxSpeed: 4,
  jumpForce: -12,
  friction: 0.8,
  onGround: false,
  boosted: false,
  boostTimer: 0,
};
 
const GRAVITY = 0.6;
 
let bgImg;
let camelImg;
 
let floorY;
 
// ------------------------------------------------------------
// PLATFORMS
// type "normal"  — standard sandy ledge
// type "boost"   — glowing orange, speed-boost mechanic
// ------------------------------------------------------------
let platforms = [
  { x: 80,  y: 310, w: 130, h: 18, type: "normal" },
  { x: 290, y: 260, w: 110, h: 18, type: "normal" },
  { x: 480, y: 210, w: 100, h: 18, type: "normal" },
  { x: 630, y: 300, w: 110, h: 18, type: "normal" },
  // Custom boost platform — triggers speed mechanic
  { x: 360, y: 360, w: 120, h: 18, type: "boost"  },
];
 
// ============================================================
// preload()
// ============================================================
function preload() {
  bgImg    = loadImage("assets/images/background.jpg");
  camelImg = loadImage("assets/images/Camel.png");
}
 
// ============================================================
// setup()
// ============================================================
function setup() {
  createCanvas(800, 450);
  floorY = height - 40;
  player.y = floorY - player.h;
  imageMode(CORNER);
}
 
// ============================================================
// draw()
// ============================================================
function draw() {
  image(bgImg, 0, 0, width, height);
 
  drawFloor();
  drawPlatforms();
  handleInput();
  applyPhysics();
  checkPlatformCollisions();
  tickBoost();
  drawPlayer();
  drawHUD();
}
 
// ------------------------------------------------------------
// handleInput()
// ------------------------------------------------------------
function handleInput() {
  let currentMaxSpeed = player.boosted ? player.maxSpeed * 2.2 : player.maxSpeed;
 
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.vx -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.vx += player.speed;
  }
 
  player.vx = constrain(player.vx, -currentMaxSpeed, currentMaxSpeed);
 
  if (
    !keyIsDown(LEFT_ARROW) && !keyIsDown(65) &&
    !keyIsDown(RIGHT_ARROW) && !keyIsDown(68)
  ) {
    player.vx *= player.friction;
  }
 
  if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && player.onGround) {
    player.vy = player.jumpForce;
    player.onGround = false;
  }
}
 
// ------------------------------------------------------------
// applyPhysics()
// ------------------------------------------------------------
function applyPhysics() {
  player.vy += GRAVITY;
  player.x  += player.vx;
  player.y  += player.vy;
 
  // Floor collision
  if (player.y + player.h >= floorY) {
    player.y        = floorY - player.h;
    player.vy       = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
 
  // Wall bounds
  player.x = constrain(player.x, 0, width - player.w);
}
 
// ------------------------------------------------------------
// checkPlatformCollisions()
// AABB landing check: player must be falling onto the top face.
// ------------------------------------------------------------
function checkPlatformCollisions() {
  for (let p of platforms) {
    let prevBottom = player.y + player.h - player.vy;
    let currBottom = player.y + player.h;
 
    let overlapX = player.x + player.w > p.x && player.x < p.x + p.w;
    let landedOn = prevBottom <= p.y && currBottom >= p.y;
 
    if (overlapX && landedOn && player.vy >= 0) {
      player.y        = p.y - player.h;
      player.vy       = 0;
      player.onGround = true;
 
      // --- Custom mechanic: BOOST PLATFORM ---
      if (p.type === "boost" && !player.boosted) {
        player.boosted    = true;
        player.boostTimer = 180; // 3 seconds at 60fps
        let dir = player.vx >= 0 ? 1 : -1;
        player.vx = dir * player.maxSpeed * 2.5;
      }
    }
  }
}
 
// ------------------------------------------------------------
// tickBoost()
// ------------------------------------------------------------
function tickBoost() {
  if (player.boosted) {
    player.boostTimer--;
    if (player.boostTimer <= 0) {
      player.boosted    = false;
      player.boostTimer = 0;
    }
  }
}
 
// ------------------------------------------------------------
// drawPlatforms()
// ------------------------------------------------------------
function drawPlatforms() {
  for (let p of platforms) {
    if (p.type === "boost") {
      let pulse = 0.5 + 0.5 * sin(frameCount * 0.08);
      noStroke();
      fill(255, 140, 0, 60 + pulse * 40);
      rect(p.x - 6, p.y - 4, p.w + 12, p.h + 8, 6);
      fill(255, 160, 30);
      rect(p.x, p.y, p.w, p.h, 4);
      fill(80, 30, 0);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text("SPEED BOOST!", p.x + p.w / 2, p.y + p.h / 2);
    } else {
      noStroke();
      fill(194, 154, 90);
      rect(p.x, p.y, p.w, p.h, 4);
      fill(210, 175, 110);
      rect(p.x + 4, p.y + 3, p.w - 8, 4, 2);
    }
  }
}
 
// ------------------------------------------------------------
// drawPlayer()
// ------------------------------------------------------------
function drawPlayer() {
  push();
 
  if (player.boosted) {
    tint(255, 180, 80, 220);
  }
 
  if (player.vx < -0.5) {
    translate(player.x + player.w, player.y);
    scale(-1, 1);
    image(camelImg, 0, 0, player.w, player.h);
  } else {
    image(camelImg, player.x, player.y, player.w, player.h);
  }
 
  noTint();
  pop();
 
  // Dust particles during boost
  if (player.boosted) {
    for (let i = 0; i < 3; i++) {
      let px = player.x + random(0, player.w);
      let py = player.y + player.h + random(-4, 4);
      fill(220, 180, 100, random(80, 180));
      noStroke();
      ellipse(px, py, random(4, 10));
    }
  }
}
 
// ------------------------------------------------------------
// drawFloor()
// ------------------------------------------------------------
function drawFloor() {
  noStroke();
  fill(194, 154, 90, 200);
  rect(0, floorY, width, height - floorY);
  fill(210, 175, 110, 150);
  rect(0, floorY, width, 6);
}
 
// ------------------------------------------------------------
// drawHUD()
// ------------------------------------------------------------
function drawHUD() {
  noStroke();
  fill(0, 0, 0, 120);
  rect(8, 8, 560, 24, 6);
 
  fill(240, 220, 180);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text("Move: Arrow Keys / WASD   Jump: W / Up   Land on orange for SPEED BOOST!", 16, 14);
 
  if (player.boosted) {
    fill(255, 160, 30);
    textSize(14);
    textAlign(CENTER, TOP);
    text("SPEED BOOST! " + ceil(player.boostTimer / 60) + "s", width / 1.8, 14);
  }
}