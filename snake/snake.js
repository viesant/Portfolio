//(A) canvas : este é o canvas do html
let canvas = document.getElementById("snake");
//(B) context : este é o contexto do canvas
let context = canvas.getContext("2d");
//(C) box : este é o tamanho da caixa
let box = 32;
//(D) snake : esta é a cobrinha, a personagem principal do game.
let snake = [{ x: 7 * box, y: 8 * box }];
// let snake = [{ x: 8 * box, y: 8 * box },{ x: 7 * box, y: 8 * box },{ x: 6 * box, y: 8 * box }];
//(E) direction : este é o sentido/direção em que a cobrinha vai andar
let direction = "right";
let nextDirection = "right";
//(F) food : é a comida que a cobrinha come e cresce
let food = {
  x: Math.floor(Math.random() * 16) * box,
  y: Math.floor(Math.random() * 16) * box,
};
// para aumentar velocidade do jogo
let counterFood = 0;
let interval = 100;

function renderBG() {
  //   context.fillStyle = "chartreuse";
  //   context.fillRect(0, 0, 16 * box, 16 * box);
  context.fillStyle = "green";
  context.fillRect(0, 0, 16 * box, 16 * box);
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
      context.fillStyle = "chartreuse";
      context.fillRect(x * 32 + 1, y * 32 + 1, box - 2, box - 2);
    }
  }
}
function renderSnake() {
  snake.map((block) => {
    // console.log(pos + pos.x + pos.y)
    context.fillStyle = "green";
    context.fillRect(block.x, block.y, box, box);
    // context.fillStyle = "chartreuse";
    // context.fillRect(block.x+1, block.y+1, box-2, box-2);
  });
}
function renderFood() {
  context.fillStyle = "red";
  context.fillRect(food.x + 1, food.y + 1, box - 2, box - 2);
  //   context.fillStyle = "green";
  //   context.fillRect(food.x + 8, food.y + 1, 16, box - 2);
  //   context.fillRect(food.x + 1, food.y + 8, box - 2, 16);
}
function updateDirection(e) {
  //   console.log(e.code);
  if (nextDirection != direction) return;
  switch (e.code) {
    case "ArrowUp":
      if (direction != "down") nextDirection = "up";
      break;
    case "ArrowDown":
      if (direction != "up") nextDirection = "down";
      break;
    case "ArrowRight":
      if (direction != "left") nextDirection = "right";
      break;
    case "ArrowLeft":
      if (direction != "right") nextDirection = "left";
      break;
    case "Space":
      clearInterval(game);
      break;
    default:
      break;
  }
}

function checkSelfColision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}
function checkFoodColision() {
  if (food.x === snake[0].x && food.y === snake[0].y) {
    return true;
  }
}

function handleBorderColision() {
  if (snake[0].x > 15 * box) snake[0].x = 0;
  if (snake[0].x < 0) snake[0].x = 16 * box;
  if (snake[0].y > 15 * box) snake[0].y = 0;
  if (snake[0].y < 0) snake[0].y = 16 * box;
}

function createNewFood() {
  let emptyTile = true;
  do {
    food.x = Math.floor(Math.random() * 16) * box;
    food.y = Math.floor(Math.random() * 16) * box;
    emptyTile = true;
    //confere se food está em cima de snake
    for (let i in snake) {
      if (food.x === snake[i].x && food.y === snake[i].y) {
        emptyTile = false;
      }
    }
  } while (!emptyTile); //repete se food ocupado por snake
}

function runGame() {
  if (checkSelfColision()) {
    clearInterval(game);
    alert('Game Over');
    //criar tela melhor de game over
  }
  //createFrame:
  renderBG();
  renderSnake();
  renderFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  direction = nextDirection; //evitar mover antes de renderizar
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  snake.unshift({ x: snakeX, y: snakeY });
  handleBorderColision();
  if (checkFoodColision()) {
    createNewFood();
    counterFood++;
    if (counterFood >= 5) {
      counterFood = 0;
      interval -= 10;
      clearInterval(game);
      game = setInterval(runGame, interval);
    }
  } else {
    snake.pop();
  }
}

document.addEventListener("keydown", updateDirection);
let game = setInterval(runGame, interval);
