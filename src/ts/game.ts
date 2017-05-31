import { Snake } from './models/snake';
import { Food } from './models/food';
import { Point } from './models/point';
import { CanvasWidth, CanvasHeight, GameObjectSize, Margin } from './utils/constants';
import { IGameObject } from './interfaces/IGameObject';
import { IPoint } from './interfaces/IPoint';
import { Directions } from './enums/directions';

export class Game {
	renderer: any;
	snake: Snake;

	constructor(renderer: any, snake: Snake) {
		this.renderer = renderer;
		this.snake = snake;
	}

	getRandomNumberBetween(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	getRandomFood(): IGameObject {
		const pX = this.getRandomNumberBetween(Margin, CanvasWidth - Margin);
		const pY = this.getRandomNumberBetween(Margin, CanvasHeight - Margin);
		const foodPos = new Point(pX, pY);
		return new Food(foodPos, foodPos, '');
	}

	init(): void {
		this.renderer.initCanvas();

		const food = this.getRandomFood();
		this.renderer.drawFood(food);

		this.snake.init();
		this.renderer.drawSnake(this.snake);
	}

	gameLoop(): void {
		setInterval(() => {
			this.renderer.clear();
			this.renderer.initCanvas();
			this.snake.moveSnake(this.snake);
			this.renderer.drawSnake(this.snake);
		}, 100);
	}
}
