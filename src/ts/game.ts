import { Snake } from './models/snake';
import { Food } from './models/food';
import { Point } from './models/point';
import { CanvasWidth, CanvasHeight, GameObjectSize, Margin } from './utils/constants';
import { IPoint } from './interfaces/IPoint';


export class Game {
	renderer: any;
	snake: Snake;

	constructor(renderer: any) {
		this.renderer = renderer;
	}

	getRandomNumberBetween(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	getRandomPoint(): IPoint {
		const pX = this.getRandomNumberBetween(Margin, CanvasWidth - Margin);
		const pY = this.getRandomNumberBetween(Margin, CanvasHeight - Margin);
		return new Point(pX, pY);
	}

	init(): void{
		const foodPos = this.getRandomPoint();
		const food = new Food(foodPos, foodPos, '');
		this.renderer.initCanvas();
		this.renderer.drawFood(food);
	}

	gameLoop(): void {
		const snake = new Snake();
		snake.init();
		this.renderer.drawSnake(snake);

		snake.updateSnake(this.snake);
		this.renderer.clear();
		this.renderer.drawSnake(this.snake);
		requestAnimationFrame(this.gameLoop);
	}
}
