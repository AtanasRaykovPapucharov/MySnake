import { Snake } from './models/snake';
import { Food } from './models/food';
import { Point } from './models/point';
import { CanvasWidth, CanvasHeight, GameObjectSize, Margin } from './utils/constants';
import { IPoint } from './interfaces/IPoint';


export class Game {
	renderer: any;

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

	gameLoop(): void {

	}

	init(): void {
		const foodPos = this.getRandomPoint();
		const food = new Food(foodPos, foodPos, '');
		const snake = new Snake();

		snake.init();
		this.renderer.initCanvas();
		this.renderer.drawSnake(snake);
		this.renderer.drawFood(food);


	}
}