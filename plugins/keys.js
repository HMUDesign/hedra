import Debug from 'debug';
let debug = Debug('hedra:plugins:mouse');

import Hedra from '../../hedra';
import THREE from 'three';

let keys = {
	'+': 107,
	'-': 109,
	'enter': 13,
	'escape': 27,
}

export default function Mouse(context, config) {
	debug('initialize', config);
	
	config = config || {};
	
	
	let keys = [null,null,null,null,null,null,null,null,'BACK_SPACE','TAB',null,null,null,'ENTER',null,null,'SHIFT','CONTROL','ALT','PAUSE/BREAK','CAPS_LOCK',null,null,null,null,null,null,'ESCAPE',null,null,null,null,null,'PAGE_UP','PAGE_DOWN','END','HOME','LEFT','UP','RIGHT','DOWN',null,null,null,null,'INSERT','DELETE',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'WIN','WIN','CONTEXT_MENU',null,null,'NUMPAD0','NUMPAD1','NUMPAD2','NUMPAD3','NUMPAD4','NUMPAD5','NUMPAD6','NUMPAD7','NUMPAD8','NUMPAD9',null,null,null,null,null,null,'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','F20','F21','F22','F23','F24',null,null,null,null,null,null,null,null,'NUM_LOCK','SCROLL_LOCK',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'MUTE','VOLUME_DOWN','VOLUME_UP','FORWARD','BACKWARD','STOP','PLAY',null,'VOLUME_MUTE','VOLUME_DOWN','VOLUME_UP',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
	
	window.addEventListener('keydown', (e) => {
		if(!keys[e.keyCode]) return;
		
		context.emit('key', keys[e.keyCode]);
	});
	
	window.addEventListener('keypress', (e) => {
		context.emit('key', String.fromCharCode(e.keyCode));
	});
}
