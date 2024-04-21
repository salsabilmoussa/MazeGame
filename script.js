 var score = 0;
 var isLose = false;
 var isWin = false;
 var isPaused = false;
 var timer=120;
 var isTimer=false;

 

function start(){
      const radioButtons = document.querySelectorAll('input[name="drone"]');
      var mode;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          mode = radioButton.id;
          break;     
        }
      }
      
  document.querySelector(".heading").classList.remove("cached");
  document.querySelector(".container").classList.add("cached");
  document.querySelector(".timer-board").classList.remove("cached");
  document.querySelector(".game-board").classList.remove("cached");
  startTimer(timer);
  if(mode=="medium" || mode=="hard")
  {drawPrices(prices);drawTimers(timers);drawMalus(malus);drawTraps(traps);}
  if(mode=="hard"){drawEnemies(enemies);}
  document.addEventListener("keydown", (ev) => {
  
    if (!isLose && !isWin) {
      switch (ev.key) {
        case "ArrowUp":
          person.moveUp();
           if(mode=="medium" || mode=="hard"){ person.eat(traps);
          drawTraps(traps);}
          break;
        case "ArrowRight":
          person.moveRight(); if(mode=="medium" || mode=="hard"){ person.eat(traps);
            drawTraps(traps);}
         
          break;
        case "ArrowDown":
          person.moveDown();  if(mode=="medium" || mode=="hard"){ person.eat(traps);
            drawTraps(traps);}
          break;
        case "ArrowLeft":
          person.moveLeft(); if(mode=="medium" || mode=="hard"){ person.eat(traps);
            drawTraps(traps);}
          break;
        default:
          break;
      }
      drawPerson();
      if(mode=="medium" || mode=="hard"){
      person.eat(prices);
      drawPrices(prices);
      person.eat(timers);
      drawTimers(timers);
      person.eat(malus);
      drawMalus(malus);
    }
    if(mode=="hard")
    {person.eat(enemies);
      drawEnemies(enemies);}
    if (person.i === goal.i && person.j === goal.j) {
      isWin = true;
      winGame();
    }
  }
  });
  
}



class Cell {
  constructor(topWall, rightWall, bottomWall, leftWall) {
    this.topWall = topWall;
    this.rightWall = rightWall;
    this.bottomWall = bottomWall;
    this.leftWall = leftWall;
  }
}


class Point {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }
  moveUp() {
    if (maze[this.i][this.j].topWall == false && this.i>=1) {
      this.i -= 1;
      score+=10;
    }
  }

  moveLeft() {
    if (maze[this.i][this.j].leftWall == false && this.j>=1) {
      this.j -= 1;
      score+=10;
    }
  }

  moveDown() {
    if (maze[this.i][this.j].bottomWall == false && this.i<=14) {
      this.i += 1;
      score+=10;
    }
  }

  moveRight() {
    if (maze[this.i][this.j].rightWall == false && this.j<=14) {
      this.j += 1;
      score+=10;
    }
  }
  eat(items) {
   
    for (var item in items) {
      if (this.i === items[item].i && this.j === items[item].j && items[item].isEaten == false) {
        items[item].isEaten = true;
        if(items==prices){score+=50;}
        if(items==malus){score-=30;}
        if (items[item].isTrap) {
          this.i = 0;
          this.j = 0;
        }
        if(items==enemies){loseGame();}
        if(items==timers){isTimer=true}
     
      }
    }
  }
}




class Item extends Point{
  constructor(i, j, isEaten = false) {
    super(i,j);
    this.isEaten = isEaten;
  }
}

class Trap extends Item {
  isTrap = true;
}



  var maze = [  
    [
      new Cell(true,true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, false,true, false),
      new Cell(true, true, false,  false),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, false, false, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, true, false),
      
    ],
    [
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(true,true , false, true),
      new Cell(false, true, false,true ),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(true, false, true, true),
      new Cell(true, true, false, false),
      new Cell( false,  false,true, true),
      new Cell(false,true , true, false),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
     
    ],
    [
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(false, false, false, false),
      new Cell(false, true, true, false),
      new Cell(false, true, false, true),
      new Cell(false, true, true, true),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, false, false, true),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, true, false, false)
      
    ],
    [
      new Cell(false, true, false, true),
      new Cell(true, false, true, true),
      new Cell(false, false, false, false),
      new Cell(true, true, false, false),
      new Cell(false, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, false, false),
      new Cell(false, false, true, false),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false,true , true,false),
      new Cell(false, true, false, true),
      new Cell(false, false,true , true),
      new Cell(true, false, false, false),
      new Cell(false,true , false, false),
      new Cell(false, true, true, true),
   
    ],
    [
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, false, true,true ),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, false, true, false),
      new Cell(true,true , false, false),
      new Cell(true, false, false, true),
      new Cell(true, false,true , false),
      new Cell(true,true, false, false),
      new Cell(false, false,true , true),
      new Cell(true, false,true , false),
      new Cell(false, true, true,false ),
      new Cell(false, false, true, true ),
      new Cell(true, true, false, false),
     
    ],
    [
      new Cell(true, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(true, true, false, true),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, false, true, false),
      new Cell(false, true, true, false),
      new Cell(true, true, false, true),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(false, true, false, false),
      
    ],
    [
      new Cell(false, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, true, false, true),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(false, false, false, true),
      new Cell(true, true, true, false),
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, false, false),
      new Cell(true, true, true, false),
      new Cell(false, true, false, true)
   
    ],
    [
      new Cell(false, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(true, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(false, false, true, false),
      new Cell(true, true, true, false),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(false, true, true, false),
     
    ],
    [
      new Cell(false, false, false, true),
      new Cell(true, true, true, false),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, true, false, true),
      new Cell(false, false, true, true),
      new Cell(false, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
     
    ],
    [
      new Cell(false, false, false, true),
      new Cell(true, true, true, false),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, true, true, true),
      new Cell(false, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(false, true, false, false),
      
    ],
    [
      new Cell(false, true, true, true),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(false, false, true, false),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(true, false, false, true),
      new Cell(true, true, false, false),
      new Cell(false, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, true, true, true),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      
    ],
    [
      new Cell(true, false, true, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(true, true, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, true, false),
      new Cell(false, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, true, false, true),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, true, true, true),
     
    ],
    [
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(true, true, true, false),
      new Cell(false, false, false, true),
      new Cell(true, false, true, false),
      new Cell(false, true, true, false),
      new Cell(true, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, false, false, true),
      new Cell(true, true, false, false),
   
    ],
    [
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(true, false, false, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, true, false, false),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, true, false, true),
     
    ],
    [
      new Cell(true, false, false, true),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, false, true),
      new Cell(false, true, true, true),
      new Cell(true, false, false, true),
      new Cell(false, true, false, false),
      
     
    ],
    [
      new Cell(false, false, true, true),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(true, false, true, false),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
      new Cell(false, false, true, false),
      new Cell(true, false, true, false),
      new Cell(false, true, true, false),
      new Cell(false, false, true, true),
     
    ],
  ];
function createMaze(){
for (var i = 0; i < 16; i++) {
  var gameRow = document.createElement("div");
  gameRow.classList.add("game-row");

  for (var j = 0; j < 16; j++) {
    var div = document.createElement("div");

    div.id = i + "" + j;
    div.classList.add("game-cell");
    if (maze[i][j].topWall) div.classList.add("top-border");
    if (maze[i][j].rightWall) div.classList.add("right-border");
    if (maze[i][j].bottomWall) div.classList.add("bottom-border");
    if (maze[i][j].leftWall) div.classList.add("left-border");
    gameRow.appendChild(div);
  }
  document.querySelector(".game-board").appendChild(gameRow);
}}

var person=new Point(0,0);
function drawPerson() { 
  document.querySelector(".person")?.remove();
  var personDiv = document.createElement("div");
  personDiv.classList.add("person");
  document.getElementById(`${person.i}${person.j}`).appendChild(personDiv);
}

var goal=new Point(15,15);



function pauseGame(pauseButton) {
  isPaused = !isPaused;
  pauseButton.innerText =isPaused ? "⏺" : "⏸";
  document.querySelector(".game-board").classList.toggle("cached");
}


createMaze();
drawPerson();

function loseGame() {
  isLose = true;
  document.querySelector(".heading").classList.add("cached");
  document.querySelector(".game-board").classList.add("cached");
  document.querySelector(".timer-board").classList.add("cached");
  document.querySelector(".lose-result").classList.remove("cached");
}

function startTimer(timer) {
  interval = setInterval(() => {
    if (timer <= 0) {
      loseGame();
      clearInterval(interval);
    } else if (isWin) {
      clearInterval(interval);
    } else if (!isPaused) {
      if(isTimer==true){timer+=5;isTimer=false;}
      timer--;
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      document.querySelector(".timer").innerText = `${
        minutes < 10 ? 0 : ""
      }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }
  }, 1000);
}

function winGame() {
  document.querySelector("#score").innerText = `Final Score: ${score}`;
  document.querySelector(".heading").classList.add("cached");
  document.querySelector(".game-board").classList.add("cached");
  document.querySelector(".timer-board").classList.add("cached");
  document.querySelector(".win-result").classList.remove("cached");
}


var prices =[new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
]

function drawPrices(prices){
  for (let img of document.querySelectorAll(".price")) {
    img.remove();
  }
  for (let price of prices) {
    if (price.isEaten == false) {
  var priceDiv = document.createElement("img");
   priceDiv.classList.add("price");
  priceDiv.setAttribute("src", "images/bonus.jpg");
  document.getElementById(`${price.i}${price.j}`).appendChild(priceDiv);
  }
}
}
var timers=[new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15))
]
function drawTimers(timers){
  for (let img of document.querySelectorAll(".time")) {
    img.remove();
  }
  for (let t of timers) {
    if (t.isEaten == false) {
  var timerDiv = document.createElement("img");
   timerDiv.classList.add("time");
   timerDiv.setAttribute("src", "images/timer.png");
   document.getElementById(`${t.i}${t.j}`).appendChild(timerDiv);
  }
}
}

var malus=[new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
]
function drawMalus(malus){
  for (let img of document.querySelectorAll(".malus")) {
    img.remove();
  }
  for (let t of malus) {
    if (t.isEaten == false) {
  var malusDiv = document.createElement("img");
   malusDiv.classList.add("malus");
   malusDiv.setAttribute("src", "images/QST.png");
   document.getElementById(`${t.i}${t.j}`).appendChild(malusDiv);
  }
}
}

var traps =[new Trap( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Trap( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15))
]

function drawTraps(traps) {
  for (let img of document.querySelectorAll(".trap")) {
    img.remove();
  }
  for (let trap of traps) {
    if (trap.isEaten == false) {
      let trapDiv = document.createElement("img");
      trapDiv.classList.add("trap");
      trapDiv.setAttribute("src", "images/gold.jpg");
      document.getElementById(`${trap.i}${trap.j}`).appendChild(trapDiv);
    }
  }
}

var enemies= [new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)),
  new Item( Math.floor(Math.random() * 15), Math.floor(Math.random() * 15))
]

function drawEnemies(enemies) {
  for (let img of document.querySelectorAll(".enemy")) {
    img.remove();
  }
  for (let enemy of enemies) {
    if (enemy.isEaten == false) {
      let enemyDiv = document.createElement("img");
      enemyDiv.classList.add("enemy");
      enemyDiv.setAttribute("src", "images/ennemis.png");
      document.getElementById(`${enemy.i}${enemy.j}`).appendChild(enemyDiv);
    }
  }
}

    