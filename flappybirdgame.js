let bird;
var topPipe;
var botPipe;
var GAP_SIZE = 140;
var score = 0;  

let clouds; 
let scroll; 

// importing the image
let birdImg;
function preload() {
  // preload() runs once
  birdImg = loadImage('assets/flappyb.png');    
} 


// show(); { 
// // image(ball, this.x, this.y);
// }

function setup() {
  createCanvas(700, 700);  
  scroll = 500;  
  
  clouds = [
    {x: -1000, y: 200, w: 100, h:50},
    {x: -400,y: 500, w: 150, h: 60},
    {x: -500, y: 200, w: 100, h:80}, 
    {x: 100, y: 600, w: 150, h: 40},
    {x: 300, y: 200, w: 100, h: 50},
    {x: 700, y: 400, w: 140, h: 50},
    {x: 1000,y: 100,w: 100, h: 40}
    ]
  
  fill(0);
  noStroke();
  textSize(32);

  matter.init();

  bird = matter.makeBall(width / 2, height / 2, 20, 20, { friction: 0, restitution: 1 });
  makePipes();
}

function mousePressed() {
  bird.setVelocityY(-8);
}

//draw clouds  
//using scroll function 
function draw() {
  background(120,160,190); //blue 
  //       
   push();
  translate(scroll, 0)
  //clouds
  for (let i = 0; i < clouds.length; i++) {
    fill(255);
    noStroke();
    ellipse(clouds[i].x, clouds[i].y - 15,
      clouds[i].w - 10, clouds[i].h)

    ellipse(clouds[i].w + 10, clouds[i].h,
      clouds[i], clouds[i])

    ellipse(clouds[i].x - 10, clouds[i].y,
      clouds[i].x, clouds[i].h)
  }
  pop();
  
  topPipe.show();
  botPipe.show();
  bird.show();
  image(birdImg,0, 0, 20, 20);   
  // var birdImgPosition = bird.getPositionX(); 
  // birdImg.setPositionX(bird, width / 2, height / 2, 20, 20); 
  // birdImg.setVelocityY(bird, -8)
  // getPositionX(bird, width / 2, height / 2, 20, 20); 
  // getPositionY(bird, width / 2, height / 2, 20, 20); 
  // getVelocityY(bird) 
  //getVelocity(bird, -8); 
// birdImg.setPositionX (bird.getPositionX(), bird.getPositionY(),              bird.getWidth(), bird.getHeight());
  text(score, width - 100, 100);
  
  var pipePosition = topPipe.getPositionX();
  topPipe.setPositionX(pipePosition - 2);
  botPipe.setPositionX(pipePosition - 2);

  if (topPipe.isOffCanvas()) {
    makePipes();
    score += 10;
  }

  if (bird.isOffCanvas()) {
    bird = matter.makeBall(width / 2, height / 2, 20, 20);  
    // getPosition(birdImg,width / 2, height / 2, 20, 20);
    // getPositionY(birdImg, width / 2, height / 2, 20, 20);
    score = 0;
  }
}

function makePipes() {
  var gap = random(height / 4, 3 * height / 4);
  var gapStart = gap - GAP_SIZE / 2;
  var gapEnd = gap + GAP_SIZE / 2;

  topPipe = matter.makeBarrier(width, gapStart / 2, 80, gapStart, { friction: 0, restitution: 1 });
  botPipe = matter.makeBarrier(width, (height + gapEnd) / 2, 80, height - gapEnd, { friction: 0, restitution: 1 }); 
   }


