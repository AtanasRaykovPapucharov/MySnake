import { CanvasWidth, CanvasHeight, GameObjectSize, Speed } from './utils/constants';
import { IGameObject } from './interfaces/IGameObject';
import { IPoint } from './interfaces/IPoint';
import { Directions } from './enums/directions';
import { Point } from './models/point';
import { Snake } from './models/snake';
import { Food } from './models/food';
import { Score } from './models/score';

export class Game {
	snake: Snake;
	food: IGameObject;
	score: Score;
	points: number;
	renderer: any;

	constructor(renderer: any, snake: Snake) {
		this.snake = snake;
		this.score = new Score();
		this.points = this.score.getPoints();
		this.renderer = renderer;
	}

	getRandomNumberBetween(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	getRandomFood(): IGameObject {
		const pX = Math.floor((Math.random() * (CanvasWidth - 2 * GameObjectSize) / GameObjectSize))
			* GameObjectSize + GameObjectSize;
		const pY = Math.floor((Math.random() * (CanvasHeight - 2 * GameObjectSize) / GameObjectSize))
			* GameObjectSize + GameObjectSize;

		const foodPos = new Point(pX, pY);
		return new Food(foodPos, foodPos, '');
	}

	init(): void {
		this.renderer.initCanvas();

		this.food = this.getRandomFood();
		this.renderer.drawFood(this.food);

		this.snake.init();
		this.renderer.drawSnake(this.snake);
		document.getElementById('current-points').innerHTML = this.points.toString();
	}

	getFood(): boolean {
		const head = this.snake.snakeParts[0];
		if (head.position.x == this.food.position.x &&
			head.position.y == this.food.position.y) {
			return true;
		}
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
			this.score.addPoints();
			this.points = this.score.getPoints();
			document.getElementById('current-points').innerHTML = this.points.toString();
		}
	}

	loop(): void {
		setInterval(() => {
			this.newFrame();
		}, Speed);
	}
}
