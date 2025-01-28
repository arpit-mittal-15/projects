let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./music/food.mp3');
const moveSound = new Audio('./music/move.mp3');
const gameoverSound = new Audio('./music/gameover.mp3');
const gameSound = new Audio('./music/music.mp3');

let speed = 5;
let lastPaintTime = 0;

let score = 0;

let snakeArr = [{x: 13, y: 15}];
let food = {x: 6, y: 7};

function main(ctime){
  window.requestAnimationFrame(main);

  if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake){

  let headX = snake[0].x;
  let headY = snake[0].y;

  for(let i=1; i<snake.length; i++){
    if(headX === snake[i].x && headY === snake[i].y){
      return true;
    }
  }

  if(headX >= 18 || headX <= 0 || headY >= 18 || headY <= 0){
    return true;
  }

  return false;
}

function gameEngine(){
  //1: updating the snake array

  if(isCollide(snakeArr)){
    gameoverSound.play();
    gameSound.pause();
    inputDir = {x:0, y:0};
    alert("Game Over! Press any key to play again!");
    snakeArr = [{x:13, y:15}];
    gameSound.play();
    score = 0;
  }

  // if you have eaten the food then update the score and regenerate the food

  if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){

    foodSound.play();

    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

    let a = 2;
    let b = 16;

    food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};

  }

  //moving the snake

  for(let i = snakeArr.length -2; i >= 0; i--){
    snakeArr[i+1] = {...snakeArr[i]}
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;


  //2: render the snake and food 

  board.innerHTML = "";

  snakeArr.forEach((element, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if(index === 0){
      snakeElement.classList.add("head")
    }
    else{
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}


//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  inputDir = {x:0, y:1}
  moveSound.play();
  gameSound.play();

  switch(e.key){
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
})