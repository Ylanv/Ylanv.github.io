
const llama = document.getElementById('llama');
const llamaImg = llama.querySelector("img");
const frames = ["llama_64x64.png", "llama_64x64_walk2.png", "llama_64x64_walk3.png"];
let frameIndex = 0;
let isMoving = false;
let facingRight = true;
const moveAmount = 20;

// Animate the llama
function updateLlamaFrame() {
  if (isMoving) {
    frameIndex = (frameIndex + 1) % frames.length;
    llamaImg.src = frames[frameIndex];
  } else {
    llamaImg.src = frames[0];
  }
}

setInterval(updateLlamaFrame, 150);

// Handle movement
document.addEventListener('keydown', (event) => {
  const left = llama.offsetLeft;
  const top = llama.offsetTop;
  isMoving = true;

  switch(event.key) {
    case 'ArrowLeft':
      llama.style.left = Math.max(0, left - moveAmount) + 'px';
      if (facingRight) {
        llamaImg.style.transform = 'scaleX(-1)';
        facingRight = false;
      }
      break;
    case 'ArrowRight':
      llama.style.left = Math.min(window.innerWidth - 64, left + moveAmount) + 'px';
      if (!facingRight) {
        llamaImg.style.transform = 'scaleX(1)';
        facingRight = true;
      }
      break;
    case 'ArrowUp':
      llama.style.top = Math.max(0, top - moveAmount) + 'px';
      break;
    case 'ArrowDown':
      llama.style.top = Math.min(window.innerHeight - 64, top + moveAmount) + 'px';
      break;
  }

  checkCollision();
});

document.addEventListener('keyup', () => {
  isMoving = false;
});

// Redirect if llama touches a door
function checkCollision() {
  const llamaRect = llama.getBoundingClientRect();
  document.querySelectorAll('.door').forEach(door => {
    const doorRect = door.getBoundingClientRect();
    if (
      llamaRect.left < doorRect.right &&
      llamaRect.right > doorRect.left &&
      llamaRect.top < doorRect.bottom &&
      llamaRect.bottom > doorRect.top
    ) {
      window.location.href = door.dataset.link;
    }
  });
}
