import { Renderer } from './ts/utils/renderer';
import { Game } from './ts/game';

const content = document.getElementById('content')
const canvas = content.appendChild(document.createElement('canvas'));

const renderer = new Renderer(canvas);

const game = new Game(renderer);
game.init();
