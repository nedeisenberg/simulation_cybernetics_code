#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
	gl_FragColor = vec4(u_mouse.x,abs(sin(u_time)),u_mouse.y,1.0);
}
