import { UpArrowCode, DownArrowCode, LeftArrowCode, RightArrowCode } from './ts/utils/constants';
import { Directions } from './ts/enums/directions';
import { Renderer } from './ts/utils/renderer';
import { Snake } from './ts/models/snake';
import { Game } from './ts/game';

const content = document.getElementById('content');
const canvas = content.appendChild(document.createElement('canvas'));
const renderer = new Renderer(canvas);

let snake = new Snake();
let game = new Game(renderer, snake);

window.onload = () => {
	game.start();
};
document.getElementById('btn').onclick = () => {
	if (game.isStopped) {
		snake = new Snake();
		game = new Game(renderer, snake);
		game.start();
	}
}
document.onkeydown = keyboardListener;

function keyboardListener(e: KeyboardEvent) {
	if (e.keyCode == LeftArrowCode) {
		snake.changeDirection(Directions.left);
	}
	else if (e.keyCode == RightArrowCode) {
		snake.changeDirection(Directions.right);
	}
	else if (e.keyCode == UpArrowCode) {
		snake.changeDirection(Directions.up);
	}
	else if (e.keyCode == DownArrowCode) {
		snake.changeDirection(Directions.down);
	}
};
