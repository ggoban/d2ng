// main.js

import { Game } from './game.js';

const game = new Game();
game.initialize().catch(error => console.error('Game initialization failed:', error));