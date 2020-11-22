// Ahhhhhhhh My Face Is Bouncing

let xPos;
let yPos;

let xspeed;
let yspeed;

let dvd;

let faces = [];

let faceCount;

let r, g, b;

class Face {
  constructor(currImageSource, xPos, yPos, xSpeed, ySpeed, topTint) {
    this.faceRightImageSource = 'res/falafelFaceRight.png';
    this.faceLeftImageSource = 'res/falafelFaceLeft.png';

    this.topTint = topTint;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.currImageSource = currImageSource
    this.image = loadImage(currImageSource);
  }

  flip() {
    if (this.currImageSource == this.faceRightImageSource) {
      this.currImageSource = this.faceLeftImageSource;
    } else if (this.currImageSource == this.faceLeftImageSource) {
      this.currImageSource = this.faceRightImageSource;
    }

      this.image = loadImage(this.currImageSource);  
  }

  move() {
    image(this.image, this.xPos, this.yPos);

    this.xPos = this.xPos + this.xSpeed;
    this.yPos = this.yPos + this.ySpeed;
  
    if (this.xPos + this.image.width >= width) {
      this.xSpeed = -this.xSpeed;
      this.xPos = width - this.image.width;
      this.tint();
      this.flip();
    } else if (this.xPos <= 0) {
      this.xSpeed = -this.xSpeed;
      this.xPos = 0;
      this.tint();
      this.flip();
    }
  
    if (this.yPos + this.image.height >= height) {
      this.ySpeed = -this.ySpeed;
      this.yPos = height - this.image.height;
      this.tint();
    } else if (this.yPos <= 0) {
      this.ySpeed = -this.ySpeed;
      this.yPos = 0;
      this.tint();
    }
  }

  tint() {
    r = random(50, this.topTint);
    g = random(50, this.topTint);
    b = random(50, this.topTint);

    tint(r, g, b);
  }  
}

function preload() {}

function setup(faceCount = 20) {
  createCanvas(windowWidth, windowHeight);
  console.log("setup");
  console.log(faceCount);

  var  i;
  for (i=0; i < faceCount; i++) {
    xPos = random(width);
    yPos = random(height);
    xspeed = random(6);
    yspeed = random(6);
    topTint = random(256);
  
    faces[i] = new Face('res/falafelFaceRight.png', xPos, yPos, xspeed, yspeed, topTint);
  }
}

function draw() {
  background(0);
  var i;
  animateCount = random(faceCount);

  for (i=0; i < animateCount; i++) {
    faces[i].move();
  }
}

function setFaceCount() {
  faceCount = document.getElementById('faceCount').value;
  console.log(faceCount)

  setup(faceCount);
}
