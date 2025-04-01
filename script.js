
const llama = document.getElementById('llama');
const doors = document.querySelectorAll('.door');
const moveAmount = 10;

document.addEventListener('keydown', (event) => {
  const left = llama.offsetLeft;
  const top = llama.offsetTop;

  switch(event.key) {
    case 'ArrowLeft':
      llama.style.left = Math.max(0, left - moveAmount) + 'px';
      break;
    case 'ArrowRight':
      llama.style.left = Math.min(window.innerWidth - 40, left + moveAmount) + 'px';
      break;
    case 'ArrowUp':
      llama.style.top = Math.max(0, top - moveAmount) + 'px';
      break;
    case 'ArrowDown':
      llama.style.top = Math.min(window.innerHeight - 40, top + moveAmount) + 'px';
      break;
  }

  checkCollision();
});

function checkCollision() {
  const llamaRect = llama.getBoundingClientRect();
  doors.forEach(door => {
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
