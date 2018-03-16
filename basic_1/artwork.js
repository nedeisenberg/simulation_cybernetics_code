var source_url="http://www.abcgallery.com/S/seurat/seurat37.JPG";

var varying = 'precision highp float; varying vec2 vPos;';

var vs =
 varying +
  'attribute vec3 aPosition;' +
  'void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }';

var fs = varying + 
	'uniform sampler2D u_Image;' +
	'float rand(vec2 co){' +
	'	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);' +
	'}' +
	'void main(void)' +
	'{' +
	'	gl_FragColor = texture2D(u_Image,1.-vPos)*rand(vPos);' +
	'}'; 

function setup(){
	createCanvas(1000, 1000, WEBGL);
	jatte = createShader(vs,fs);
	shader(jatte);
	park = loadImage('assets/park.jpeg');
	jatte.setUniform('u_Image',park);
	
	seurat = loadImage('assets/seurat.jpeg')

}

function draw(){
	//circle(0,0,1,1);
	//quad(-1, -1, 1, -1, 1, 1, -1, 1);
	rect(-1,-1,1,1);
	
}
