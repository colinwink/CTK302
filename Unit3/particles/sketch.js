
let cars = [] ;

function setup() {
  createCanvas(500, 500);

  // Spawn one object

  // for (let i = 0; i < 20 ; i++) {
  //     cars.push(new Car());
  // }

 noStroke();
}

function draw() {
  background('white');
  angleMode(DEGREES);

  fill('green');
   translate(10, 30);
  rotate(-45);
  rect(35, -50, 35, 150);

  fill('grey');
  translate(0, 40);
 // rotate();
 rect(35, 50, 35, 10);



     cars.push(new Car());

     for (let i = 0; i < cars.length ; i++) {
         cars[i].display();
         cars[i].move();
     }

   }




class Car {

  // constructor
  constructor() {
    this.pos = createVector(50, 65) ;
    this.vel = createVector(random(2), random(5, 7)); // initialize your attributes here
    // this.r = random(255) ;
    // this.g = random(255) ;
    // this.b = random(255) ;
    // this.a = random(255) ;
  }

  // methods

  display() {
    fill(0, 100, 200) ;
    ellipse(this.pos.x, this.pos.y, 20);
  }

  move() {
    this.pos.add(this.vel);
    // if (this.pos.x > width) this.pos.x = 0;
    // if (this.pos.x < 0) this.pos.x = width;
    // if (this.pos.y > height) this.pos.y = 0;
    // if (this.pos.y < 0) this.pos.y = height;

  }

}
