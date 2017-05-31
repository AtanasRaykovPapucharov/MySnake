import { CanvasWidth, CanvasHeight, GameObjectSize, Margin, Velocity } from './utils/constants';
import { IGameObject } from './interfaces/IGameObject';
import { IPoint } from './interfaces/IPoint';
import { Directions } from './enums/directions';
import { Point } from './models/point';
import { Snake } from './models/snake';
import { Food } from './models/food';

export class Game {
	renderer: any;
	snake: Snake;
	food: IGameObject;

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

		this.food = this.getRandomFood();
		this.renderer.drawFood(this.food);

		this.snake.init();
		this.renderer.drawSnake(this.snake);
	}

	getFood(): boolean {
		const head = this.snake.snakeParts[0];
		return false;
	}

	newFrame(): void {
		this.renderer.clear();
		this.renderer.initCanvas();
		this.renderer.drawFood(this.food);
		this.renderer.drawSnake(this.snake);
		this.snake.moveSnake(this.snake);

		if (this.getFood()) {
			this.snake.eat();
			this.food = this.getRandomFood();
		}
	}

	gameLoop(): void {
		setInterval(() => {
			this.newFrame();
		}, Velocity);
	}
}
