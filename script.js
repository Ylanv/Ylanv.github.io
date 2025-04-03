const character = document.getElementById('character');
let x = window.innerWidth / 2 - 12;
let y = window.innerHeight - 190;
let speed = 3;
let velocityY = 0;
let gravity = 0.6;
let jumpStrength = -12;
let isJumping = false;
let isCrouching = false;
let moving = false;
let direction = 'right';
let groundY = y;
let scrollOffset = 0;
let animationFrame;



function updatePosition() {
  character.style.left = `${x}px`;
  character.style.top = `${y}px`;
}

function updateParallax() {
  const speeds = [0.2, 0.4, 0.6, 0.8, 1];
  speeds.forEach((speed, i) => {
    const layer = document.querySelector(`.layer${i + 1}`);
    if (layer) {
      layer.style.transform = `translateX(${-scrollOffset * speed}px)`;
    }
  });
}

function startAnimation() {
  character.style.animation = 'walk 0.6s steps(11) infinite';
}

function stopAnimation() {
  character.style.animation = 'none';
  character.style.backgroundPosition = '0 0';
}

function moveLeft() {
  direction = 'left';
  character.style.transform = 'scale(2) scaleX(-1)';
  x = Math.max(0, x - speed);
}

function moveRight() {
  direction = 'right';
  character.style.transform = 'scale(2) scaleX(1)';
  x = Math.min(window.innerWidth - 24, x + speed);
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    velocityY = jumpStrength;
    character.style.animation = 'jump 0.2s steps(1) 1';
    if (!animationFrame) animationFrame = requestAnimationFrame(gameLoop);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    if (!isCrouching && !isJumping) {
      isCrouching = true;
      character.style.animation = 'crouch 0.6s steps(8) infinite';
    }
    if (!animationFrame) animationFrame = requestAnimationFrame(gameLoop);
    return;
  }

  if (e.key === 'ArrowUp' && !isJumping && !isCrouching) {
    jump();
    return;
  }

  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !moving) {
    direction = e.key === 'ArrowLeft' ? 'left' : 'right';
    moving = true;
    character.style.transform = `scale(2) scaleX(${direction === 'left' ? -1 : 1})`;

    if (!isCrouching && !isJumping) {
      character.style.animation = 'walk 0.6s steps(11) infinite';
    } else if (isCrouching) {
      character.style.animation = 'crouch 0.6s steps(8) infinite';
    }

    if (!animationFrame) animationFrame = requestAnimationFrame(gameLoop);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowDown') {
    isCrouching = false;
    if (!isJumping && !moving) stopAnimation();
    else if (moving) startAnimation();
    return;
  }

  if ((e.key === 'ArrowLeft' && direction === 'left') || (e.key === 'ArrowRight' && direction === 'right')) {
    moving = false;
    if (!isCrouching && !isJumping) stopAnimation();
    else if (isCrouching) character.style.animation = 'crouch 0.6s steps(8) infinite';
  }
});

function gameLoop() {
  if (moving) {
    direction === 'left' ? moveLeft() : moveRight();
    scrollOffset += direction === 'right' ? speed : -speed;
  scrollOffset = Math.max(0, scrollOffset); // 🚫 don't go negative
    updateParallax();
    

  }

  if (isJumping) {
    velocityY += gravity;
    y += velocityY;
    if (y >= groundY) {
      y = groundY;
      isJumping = false;
      velocityY = 0;
      if (moving && !isCrouching) startAnimation();
      else if (!moving) stopAnimation();
    }
  }

  updatePosition();

  if (moving || isJumping) {
    animationFrame = requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}
