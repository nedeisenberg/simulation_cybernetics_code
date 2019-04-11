// - using and updating state
// - js objects
// - interactivity (mouse click, key presses)
// - conditionals


// to keep track of the game state
const STATE = {
  minutes: 0,
  counter: 0,
  beaver: 0,
  prog: 0, //states which tree is in prog of being collected
  victory: false
 }

var currents = [0,0,0,0,0,0]
var bridges = [0,0,0,0,0,0]

var windowW = window.innerWidth;
var windowH = window.innerHeight;

var placeW = windowW/2//900;
var placeH = windowH/2//500;

var bankX = windowW/2+placeW/3;

var riverWidth = (placeW/3)*2;

var currentWidth = riverWidth/6;

var assetSize = windowW/30;

var intro = true;
var bg;
var birch;
var oak;
var redwood;

var beaver;

var logo;


function preload() {
	bg = loadImage('assets/bg.jpeg');
	birch = loadImage('assets/birch.jpeg');
	oak = loadImage('assets/oak.jpeg');
	redwood = loadImage('assets/redwood.jpeg');
	
	beaver = loadImage('assets/beaver.jpeg');
	
	logo = loadImage('assets/beaver_logo.png');
}

function bgTile(){
	for(x=0; x<windowW; x+=8){
		for(y=0; y<windowH; y+=8){
			image(bg,x,y);		
		}
	}
}

function place(){
	//place mat
	rectMode(CENTER);
	fill(14,145,14);
	rect(windowW/2,windowH/2,placeW,placeH);
	
	//trees
	imageMode(CENTER);
	image(birch, windowW/2 + placeW/2 - 40,windowH/2-placeH/3,assetSize,assetSize);
	image(oak, windowW/2 + placeW/2 - 40, windowH/2,assetSize,assetSize);
	image(redwood, windowW/2 + placeW/2 - 40, windowH/2+placeH/3,assetSize,assetSize);

	//riverbed
	fill(50,30,0);
	rect(windowW/2,windowH/2,riverWidth,placeH);
}

function randRiver(){
	//assigns currents random values
	for(r=0; r<6; r++){
		rand = random(0,6);
		currents[r] = Math.ceil(rand);
		console.log(currents[r]);
	}
}
	
function drawRiver(){
	//draws river currents
	var rX = windowW/2 - riverWidth/2;
	var rY = windowH/2 - placeH/2;
	
	var rVal;
	
	rectMode(CORNER);
	
	for(r=0; r<6; r++){
		rVal = 255-(255/6)*currents[r];
		fill(rVal,rVal,255);
		noStroke();
		rect(rX+currentWidth*r,rY,currentWidth,placeH);	
	}
}

function drawBeaver(loc){
	var posA = [windowW/2+riverWidth/2+20,windowH/2]
	var posB = [windowW/2+placeW/2-50,windowH/2-placeH/3]
	var posC = [windowW/2+placeW/2-50,windowH/2]
	var posD = [windowW/2+placeW/2-50,windowH/2+placeH/3]
	
	var posE = [bankX-currentWidth/2,windowH/2]
	var posF = [bankX-currentWidth-currentWidth/2,windowH/2]
	var posG = [bankX-currentWidth*2-currentWidth/2,windowH/2]
	var posH = [bankX-currentWidth*3-currentWidth/2,windowH/2]
	var posI = [bankX-currentWidth*4-currentWidth/2,windowH/2]
	var posJ = [bankX-currentWidth*5-currentWidth/2,windowH/2]
	
	imageMode(CENTER);
	
	var beaverSize = 60;
	if (loc==0){
		image(beaver,posA[0],posA[1],60,60)	
	}
	switch(loc) {
		case 0:
		image(beaver,posA[0],posA[1],beaverSize,beaverSize);
		break;
		case 1:
		image(beaver,posB[0],posB[1],beaverSize,beaverSize);		
		break;
		case 2:
		image(beaver,posC[0],posC[1],beaverSize,beaverSize);
		break;
		case 3:
		image(beaver,posD[0],posD[1],beaverSize,beaverSize);
		break;
		case 4:
		image(beaver,posE[0],posE[1],beaverSize,beaverSize);
		break;
		case 5:
		image(beaver,posF[0],posF[1],beaverSize,beaverSize);
		break;
		case 6:
		image(beaver,posG[0],posG[1],beaverSize,beaverSize);
		break;
		case 7:
		image(beaver,posH[0],posH[1],beaverSize,beaverSize);
		break
		case 8:
		image(beaver,posI[0],posI[1],beaverSize,beaverSize);
		break;
		case 9:
		image(beaver,posJ[0],posJ[1],beaverSize,beaverSize);
	}
}

function setCounter(num){
	STATE.counter=num;
}

function setMinutes(num){
	STATE.minutes=num;
}

function setBeaverPos(num) {
	STATE.beaver=num;
}

function setProg(num){
	STATE.prog=num;
}

function work(){
	i = 40000000;
	while(i>0){
		i--;	
	}
}

function count(){
	if(STATE.counter>0){
		if(intro==false){
			STATE.minutes++
		}
		updateRiver();
		work();
		STATE.counter--;
	}else{
		setBeaverPos(0);
		updateBridges(STATE.prog);
		setProg(0);
	}
}

function headsUp(){
//state minutes
	fill(100,255,100);
  textSize(20);
  textAlign(RIGHT)
  text(`${STATE.minutes} minutes have passed...`, windowW/2+placeW/2, windowH/2+placeH/2+32);
  
  textAlign(LEFT);
	rectMode(CORNERS);
  text("press 'b' for birch",windowW/2 + placeW/2,windowH/2-placeH/3), windowW,windowH;
  text("press 'o' for oak", windowW/2 + placeW/2, windowH/2, windowW,windowH);
  text("press 'r' for redwood",windowW/2 + placeW/2, windowH/2+placeH/3, windowW,windowH);
  var msg = "Objective: Direct a beaver's construction as they build a bridge across a changing river.  Lighter wood, though faster to collect, will be swept away by powerful currents, indicated by dark blue waters...  Currents may grow incrementally stronger, weaker or stay the same.  Test your high score; good luck!";
 textSize(16);
	text(msg,5,5,placeW/2-5,windowH);
	rectMode(CENTER);
}

function updateRiver() {
	var rand;
	var curr;
	for(b=0;b<6;b++){
			curr=currents[b];
			rand=random(0,1);
			if (curr==1){
				if (rand>.5){
					currents[b]++				
				}
			}else if (curr==6) {
				if (rand<.9){
					currents[b]--		
				}
			}else{
				if (rand<.5){
					currents[b]--				
				}else if(rand>.7){
					currents[b]++
				}
			}

		//break bridges
		if (currents[5-b] > (bridges[b]*2-1)) {
			bridges[b]=0;
		}

	}
}
	

function updateBridges(tree){
	
	if(tree>0){
		for(c=0;c<7;c++){
			if(bridges[c]==0){
				bridges[c]=tree;
				break;
			}
		}
	}
}

function checkVictory(){
	if(bridges[0] > 0 && bridges[1] >0 && bridges[2] >0 && bridges[3] >0 && bridges[4] >0 && bridges[5] >0 ){
		victory();		
	}
}

function drawBridges(){
	
		rectMode(CENTER);
		
		var curA = [bankX-currentWidth/2,windowH/2]
		var curB = [bankX-currentWidth-currentWidth/2,windowH/2]
		var curC = [bankX-currentWidth*2-currentWidth/2,windowH/2]
		var curD = [bankX-currentWidth*3-currentWidth/2,windowH/2]
		var curE = [bankX-currentWidth*4-currentWidth/2,windowH/2]
		var curF = [bankX-currentWidth*5-currentWidth/2,windowH/2]
		
		for(b=0;b<6;b++){
			if(bridges[b]>0){
				switch(bridges[b]) {
				case 1:
				fill(220,200,200);	
				break;
				case 2:
				fill(200,160,110);
				break;
				case 3:
				fill(180,30,30);
				}
				rect(bankX-(currentWidth*b+currentWidth/2),windowH/2,currentWidth,65);
			}
		}	
}

function victory() {
	STATE.victory=true;
	console.log("victory!");
	fill(255,160,230)
	textAlign(CENTER);
	textSize(64);
	text("VICTORY",windowW/2,windowH/2);
}

function welcomeText(){
	image(logo,windowW/2-70, windowH/2-60)
	textAlign(LEFT);
	textSize(48);
	fill(12,12,170);
	textStyle(BOLD);
	text("BRIDGE",windowW/2,windowH/2)
	textAlign(CENTER);
	textSize(24);
	text("Touch any key...",windowW/2,windowH/2+placeH/2+20);
}


var init=true;

// runs once at start
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

// runs every frame
function draw() {
	bgTile();
	place();
	
	if (intro){
		if (init){
			randRiver();
			init=false;		
		}
		drawRiver();
		welcomeText();
		setCounter(1);
		count();
	}else {
		count();
		headsUp();
		drawRiver();
		drawBridges();
		drawBeaver(STATE.beaver);
		checkVictory();
		if(STATE.victory){
			victory();		
		}
	}
}


function keyPressed() {
  // lookup keycodes here: http://keycode.info/
  if (intro){
	intro=false;	
  }else{
 		if (keyCode == 66 && STATE.prog==0) { // b
    		setBeaverPos(1);
     		setProg(1);
    		setCounter(1);
		}else if(keyCode == 79 && STATE.prog==0){ //o
			setBeaverPos(2);
			setProg(2);
			setCounter(3);		
		}else if(keyCode == 82 && STATE.prog==0){ //r
			setBeaverPos(3);
			setProg(3);
			setCounter(5);
		}else if(keyCode ==32){ //space
			console.log(bridges)
		}
  }
}

// resize canvas when the browser window resizes
function windowResized() {
	windowW = window.innerWidth;
	windowH = window.innerHeight;
  resizeCanvas(window.innerWidth, window.innerHeight);
}
