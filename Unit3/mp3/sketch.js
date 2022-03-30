let cars = [];
let frogPos;
let state = -1;
let timer = 0;
let lose;
let win;
let gamesong;
let wins = 0;

function preload() {
    lose = loadSound('assets/lose.mp3');
    win = loadSound('assets/win.mp3');
    gamesong = loadSound('assets/gamesong.mp3');
    menumusic = loadSound('assets/rain.mp3');
}

function setup() {
  createCanvas(350, 600);

  // Spawn one object
  // myCar = new Car();

  for (let i = 0; i < 300; i++) {
    cars.push(new Car());
  }

  frogPos = createVector(width / 2, height - 100);


  drop = loadImage('assets/tear.png');
  bg = loadImage('assets/bg.jpg');
  fly = loadImage('assets/fly.png');
  menu = loadImage('assets/menubg.jpg');
  dead = loadImage('assets/dead.jpg');
  alive = loadImage('assets/win.jpg');

}

function draw() {

  switch (state) {

    case -1:
    menumusic.loop();
    state = 0;
    break;


    case 0: // menu screen
      background(menu);
      textSize(50);
      fill('white');
      text("FLY IN\nTHE RAIN", 75, 100);
      textSize(20);
      text("survive for 15 seconds!", 120, 300)
      text("wins = " + wins, 230, 400);
      state = 0;

      break;

    case 1: // game play
    menumusic.stop();
      game();
      timer++;
      if (timer > 15 * 60) {
        timer = 0;
        state = 2;
        win.play();
        wins++;
      }
      text("time : " + Math.trunc(timer / 60), 50, 50);
      break;

    case 2: // win screen
      background(alive, 350, 400);
      textSize(50);
      fill('black');
      text("you won!", 85, 100);
      gamesong.pause();
      timer = 0;
      resetTheGame();
      break;

    case 3: // lose screen
      background(dead, 350, 400);
      textSize(50);
      fill('black');
      text("you lost!", 85, 100);
      gamesong.pause();
      timer = 0;
      resetTheGame();
      break;

  }

}




function game() {
  background(bg);

  for (let i = 0; i < cars.length; i++) {
    cars[i].display();
    cars[i].move();

    if (cars[i].pos.dist(frogPos) < 20) {
      state = 3;
      lose.play();
    }
  }

  // fill("black");
  // ellipse(frogPos.x, frogPos.y, 10, 10);
  image(fly, frogPos.x, frogPos.y, 35, 35);
  if (frogPos.x > width) frogPos.x = 0;
  if (frogPos.x < 0) frogPos.x = width;
  if (frogPos.y > height) frogPos.y = 580;

  checkForKeys();
}


class Car {
  // constructor and attributes
  constructor() {
    this.pos = createVector(random(width), random(0, -15000)); // initialize your attributes here
    this.v = createVector(0, random(3, 6));
    this.o = random(50, 100);
    this.size = random(48, 128);
  }
  // methods

  display() {
    // fill(0, 0, 210, this.o);
    //
    // // make an actual car
    // ellipse(this.pos.x, this.pos.y, 20, 30);
    image(drop, this.pos.x, this.pos.y, 30, 45);

    // textSize(this.size) ;
    // text("BOOM", this.pos.x, this.pos.y);
  }

  move() {
    this.pos.add(this.v);
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    // if (this.pos.y > height) this.pos.y = 0;
    // if (this.pos.y < 0) this.pos.y = 1;
  }
}

function checkForKeys() {
  if (keyIsDown(LEFT_ARROW)) frogPos.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) frogPos.x += 5;
  if (keyIsDown(UP_ARROW)) frogPos.y -= 5;
  if (keyIsDown(DOWN_ARROW)) frogPos.y += 5;
}

function mouseReleased() {
  switch (state) {
    case 0:
      state = 1;
      gamesong.loop();
      break;

    case 2: // win state
      state = 0;
      win.stop();
      menumusic.play();
      break;

    case 3: // lose state
      state = 0;
      lose.stop();
      menumusic.play();
      break;

  }
}

function resetTheGame() {
  timer = 0;
  cars = [];

  // Spawn objects
  for (let i = 0; i < 450; i++) {
    cars.push(new Car());
  }
}
