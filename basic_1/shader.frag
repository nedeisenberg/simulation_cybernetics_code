#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_mouse;

void main() {
	gl_FragColor = vec4(0.0,abs(sin(u_mouse.y)),0.0,1.0);
}
