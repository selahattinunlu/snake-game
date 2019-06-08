const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasSize = {
  width: 600,
  height: 600,
};

const gridSize = 20;
const maxScore = gridSize * gridSize;

let score = 0;
let isGameOver = false;
let foodPositionX = 0;
let foodPositionY = 0;

let isThereFood = false;

let positionX = 0;
let positionY = 0;

let snakeLength = 5;

let accX = 1;
let accY = 0;

let trails = [];

let interval = null;

const update = () => {
  positionX += accX;
  positionY += accY;

  if (positionX > (canvasSize.width / gridSize) - 1) {
    console.log('positionX', positionX);
    positionX = 0;
  }

  if (positionX < 0) {
    positionX = canvasSize.width / gridSize - 1;
  }

  if (positionY > canvasSize.height / gridSize - 1) {
    positionY = 0;
  }

  if (positionY < 0) {
    positionY = canvasSize.height / gridSize - 1;
  }

  const trail = trails.find(t => t.x === positionX && t.y === positionY);

  if (trail) {
    isGameOver = true;
  }

  trails.push({
    x: positionX,
    y: positionY,
  });

  while (trails.length > snakeLength) {
    trails.shift();
  }

  if (isThereFood === false) {
    foodPositionX = Math.round(Math.random() * gridSize - 1);
    foodPositionY = Math.round(Math.random() * gridSize - 1);

    if (foodPositionX < 0) {
      foodPositionX = 0;
    }

    if (foodPositionY < 0) {
      foodPositionY = 0;
    }

    isThereFood = true;
    console.log('foodPosition', foodPositionX, foodPositionY);
  }

  if (positionX === foodPositionX
    && positionY === foodPositionY) {
      isThereFood = false;
      score++;
      snakeLength++;

      if (score === maxScore) {
        alert('You win! Woa!');
      }
  }

  draw();
};

const draw = () => {
  if (isGameOver) {
    ctx.clearRect(0, 0, 600, 600);
    ctx.textAlign = 'center';
    ctx.font = '48px serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over', 600 / 2, 600 / 2);
    return;
  }

  ctx.clearRect(0, 0, 600, 600);

  ctx.fillStyle = 'white';
  ctx.font = '24px serif';
  ctx.fillText(score, 20, 20);

  ctx.fillStyle = 'orange';

  trails.forEach(t => {
    ctx.fillRect(t.x * gridSize, t.y * gridSize, gridSize - 5, gridSize - 5);
  });

  ctx.fillStyle = 'red';
  ctx.fillRect(foodPositionX * gridSize, foodPositionY * gridSize, gridSize - 5, gridSize - 5);
};

interval = setInterval(update, 1000 / 15);

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 37) { // left
    if (accX === 0 && (accY === 1 || accY === -1)) {
      accX = -1;
      accY = 0;
    }
  }

  if (e.keyCode === 38) { // up
    if (accY === 0 && (accX === 1 || accX === -1)) {
      accX = 0;
      accY = -1;
    }
  }

  if (e.keyCode === 39) { // right
    if (accX === 0 && (accY === 1 || accY === -1)) {
      accX = 1;
      accY = 0;
    }
  }

  if (e.keyCode === 40) { // down
    if (accY === 0 && (accX === 1 || accX === -1)) {
      accX = 0;
      accY = 1;
    }
  }
});
