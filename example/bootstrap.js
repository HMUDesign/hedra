import debug from 'debug';
window.debug = debug;

import App from './app';
window.app = new App({ parent: document.body });
