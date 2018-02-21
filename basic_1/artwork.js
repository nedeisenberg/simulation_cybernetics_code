var varying = 'precision highp float; varying vec2 vPos;';

var vs =
 varying +
  'attribute vec3 aPosition;' +
  'void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }';

var fs = varying + 
	'uniform sampler2D u_Image;' +
	'float rand(vec2 co){' +
	'	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 3456.5453);' +
	'}' +
	'void main(void)' +
	'{' +
	'	gl_FragColor = texture2D(u_Image,1.-vPos)*rand(vPos);' +
	'}'; 

//stochastic process
function setup(){
	createCanvas(700, 700, WEBGL);
	jatte = createShader(vs,fs);
	shader(jatte);
	park = loadImage('assets/park.jpeg');
	jatte.setUniform('u_Image',park);

}

function draw(){
	//circle(0,0,1,1);
	//quad(0, 0, 700, 0, 700, 700, 0, 700);
	//plane(700,700);
	rect(0,0,1,1);
}