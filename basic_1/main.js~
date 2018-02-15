// TODO
// - coordinate system
// - ellipses and other shapes
// - fills, strokes
// - text
// - images
// - positioning
// - rotation

// runs before everything
// use to load assets
var duck;
var nick_cage;
function preload() {
  // // load an image
  duck = loadImage('assets/duck.png');
  nick_cage = loadImage('assets/nickcage.jpeg');
}

// runs once at start
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  u_time = 0;
}

// runs every frame
function draw() {
	u_time+=1;
  background(0,0,255);
  fill(255, 255, 255);

  // https://p5js.org/reference/#/p5/ellipse
  ellipse(50, 50, 80, 80);

  // https://p5js.org/reference/#/p5/fill
  fill(255, 204, 0);

  // https://p5js.org/reference/#/p5/rect
  rect(30, 20, 55, 55);

  fill(255, 100, 0);
  rotate(0.1);
  rect(200, 180, 55, 55);
  resetMatrix();

  // get the center x and y coordinates
  [centerX, centerY] = [width/2, height/2];

  // rendering text
  fill(255, 204, 0);
  textSize(32);
  
  //inter=Math.sin(u_time);
  inter=40;
  for(i=0;i<window.innerWidth;i+=inter){
  	for(j=0;j<window.innerHeight;j+=inter)
	 //text('word', i, j);	
	   image(nick_cage,i,j,40,40);
  }

  // render the image at x=125, y=200
  rW=random(window.innerWidth);
  rH=random(window.innerHeight);
  
  rWW=random(30,130)
  rHH=random(10,100)
  image(duck, rW, rH,rWW,rHH);
  
 // image(nick_cage,window.innerWidth/2,window.innerHeight/2,40,40);
}

// resize canvas when the browser window resizes
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
