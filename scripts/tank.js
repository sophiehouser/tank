// Ahhhhhhhh My Face Is Bouncing

let xPos;
let yPos;

let xspeed;
let yspeed;

let dvd;

let faces = [];

let faceCount = 20;

let r, g, b;

let iterations;

class FaceSprite{
  constructor(xPos, yPos, xSpeed, ySpeed) {
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    let imageRight = loadImage('res/falafelFaceRight.png');
    let imageLeft = loadImage('res/falafelFaceLeft.png');

    this.sprite = createSprite(xPos, yPos);
    this.sprite.addImage("right", imageRight);
    this.sprite.addImage("left", imageLeft);
    //this.sprite.addSpeed(xSpeed, xSpeed * 10);
    this.sprite.position.x = xPos;
    this.sprite.position.x = yPos;
    //this.sprite.setVelocity(xSpeed, ySpeed);
  }

  move() {
    this.sprite.position.x = this.sprite.position.x + this.xSpeed;
    this.sprite.position.y = this.sprite.position.y + this.ySpeed;

    console.log(this.sprite.originalWidth);
  
    if (this.sprite.position.x + this.sprite.width >= windowWidth) {
      this.xSpeed = -this.xSpeed;
      this.sprite.position.x = windowWidth - this.sprite.width;
      this.sprite.mirrorX(-1);
      //this.tint();
      //this.flip();
    } else if (this.sprite.position.x <= 0) {
      this.xSpeed = -this.xSpeed;
      this.sprite.position.x = 0;
      this.sprite.mirrorX(1);
      //this.tint();
      //this.flip();
    }
  
    if (this.sprite.position.y + this.sprite.height/2 >= windowHeight) {
      this.ySpeed = -this.ySpeed;
      this.sprite.position.y = windowHeight - this.sprite.height;
      //this.tint();
    } else if (this.sprite.position.y <= 0) {
      this.ySpeed = -this.ySpeed;
      this.sprite.position.y = 0;
    }
  }
}

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

  for (i=0; i < faces.length; i++) {
    console.log('remove');
    faces[i].sprite.remove();
  }

  var  i;
  console.log(faceCount);
  for (i=0; i < faceCount; i++) {
    xPos = random(windowWidth);
    yPos = random(windowHeight);
    xspeed = random(6);
    yspeed = random(6);
  
    //faces[i] = new Face('res/falafelFaceRight.png', xPos, yPos, xspeed, yspeed, 256);
    faces[i] = new FaceSprite(xPos, yPos, xspeed, yspeed);
  }
}

function draw() {
  background(0);

  //spr = new FaceSprite(width/2, height/2, 4, 4);
  drawSprites();

  var i;
  //animateCount = random(faceCount);
  animateCount = faceCount;

  for (i=0; i < faceCount; i++) {
    faces[i].move();
  }
}

function setFaceCount() {
  faceCount = document.getElementById('faceCount').value;

  if (!faceCount) {
    console.log("face count null");
    faceCount = 1;
  }

  console.log(faceCount)
  setup(faceCount);
}
