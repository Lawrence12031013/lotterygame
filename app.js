// set the max number
let y = prompt("請輸入賓果最大數值");
let gameNumber = parseInt(y);
// array with generated numbers;
let resultsArray = [];
// function to draw numbers and place them as a divs in DOM;
let x = prompt("目前累計獎金");
let money = parseInt(x);
let moneyArray = [];

function lotteryNumbers() {
  // check length of result array;
  if (resultsArray.length === gameNumber) {
    // if it's equal to gameTimes, then stop function;
    return;
  }
  // draw lottery numbers between 1 and gameNumber;
  let drawResult = Math.floor(Math.random() * gameNumber + 1);
  // check if drawResult exist in resultsArray. For first run the array is empty;
  for (let i = 0; i < resultsArray.length; i++) {
    if (drawResult === resultsArray[i]) {
      return lotteryNumbers;
    }
  }
  // create div element with class = balls and generated number as a text;
  let number = document.createElement("p");
  number.classList.add("balls");
  number.innerText = drawResult;
  // put lottery number into resultsArray;
  resultsArray.push(drawResult);

  // place div with lottery number in right place in body;
  const numbersContainer = document.getElementById("container");

  numbersContainer.appendChild(number);

  numbersContainer.addEventListener("animationend", function () {
    number.style.display = "none";
  });

  //set animation appear after animation
  setTimeout(() => {
    // create the numberlist on left
    let numberBox = document.createElement("div");
    numberBox.classList.add("ballBox");
    numberBox.innerText = drawResult;

    const ballBoxShell = document.getElementById("numberbox");
    ballBoxShell.appendChild(numberBox);
  }, 1500);
}

function bonus() {
  let moneybox = document.createElement("p");
  moneybox.classList.add("finalMoney");
  moneybox.innerText = "目前累計金額" + money;

  const moneyContainer = document.getElementById("mmoney");

  moneyContainer.appendChild(moneybox);

  bonus = undefined;
}

// hide modal function;
function hideModal(el) {
  el.style.display = "none";
}

// show the modal if the lottery not finished;
function modalActive() {
  // the modal element;
  const modal = document.getElementById("modal");
  // modal button to hide it;
  const modalBtn = document.getElementById("modal-btn");
  // show modal;
  modal.style.display = "block";
  // listen for click on modal btn to hide modal;
  modalBtn.addEventListener("click", function () {
    hideModal(modal);
  });
  // listen for click arround modal to hide it;
  window.addEventListener("click", function (ev) {
    if (ev.target === modal) {
      hideModal(modal);
    }
  });
}

// function to reset container for numbers if the lottery has been finished (6 numbers drawed) if not then show message to finish lottery;
function resetContainer() {
  if (resultsArray.length < 1) {
    // call function to show modal;
    modalActive();
  } else {
    const container = document.getElementById("container");
    container.innerHTML = "";
    const numberBox = document.getElementById("numberbox");
    numberBox.innerHTML = "";
    resultsArray = [];
    //        clickListener();
  }
}

// reset container when Reset Numbers button has been clicked;
let resetBtn = document.getElementById("reset-numbers");
resetBtn.addEventListener("click", resetContainer);

// start listening when DOM loaded;
function clickListener() {
  // generate random numbers when Generate button has been clicked;
  let generateBtn = document.getElementById("draw-number");
  generateBtn.addEventListener("click", lotteryNumbers);
}
// call function to listen for click on Generate button when DOM loaded;
document.addEventListener("DOMContentLoaded", clickListener);

//set canvas
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = canvas.clientWidth * window.devicePixelRatio);

const height = (canvas.height = canvas.clientHeight * window.devicePixelRatio);

function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function Ball() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.velX = random(-10, 10);
  this.velY = random(-10, 10);
  this.color = "rgba(15, 37, 37, .5)";
  this.size = 25;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

let testBall = new Ball();

Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

let balls = [];

function loop() {
  ctx.fillStyle = "rgba(25,110,32,1)";
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 75) {
    var ball = new Ball();
    balls.push(ball);
  }

  for (i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
}

loop();

Ball.prototype.collisionDetect = function () {
  for (j = 0; j < balls.length; j++) {
    if (
      !(
        this.x === balls[j].x &&
        this.y === balls[j].y &&
        this.velX === balls[j].velX &&
        this.velY === balls[j].velY
      )
    ) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
      }
    }
  }
};
