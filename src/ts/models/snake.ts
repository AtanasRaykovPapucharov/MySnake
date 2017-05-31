import { IPoint } from '../interfaces/IPoint';
import { IGameObject } from '../interfaces/IGameObject';
import { Directions } from '../enums/directions';
import { Point } from './point';
import { SnakePart } from './snakePart';
import { GameObjectSize, CanvasWidth, CanvasHeight } from '../utils/constants';

export class Snake {
	snakeParts: IGameObject[];
	initialBodyPartsCount: number;
	direction: number;
	size: IPoint;

	constructor() {
		this.snakeParts = [];
		this.initialBodyPartsCount = 4;
		this.direction = Directions.right;
		this.size = new Point(GameObjectSize, GameObjectSize);
	}

	init(): void {
		let headPosition: IPoint;
		headPosition = new Point(CanvasWidth / 2, CanvasHeight / 2);

		const head = new SnakePart(headPosition, this.size, 'head');

		this.snakeParts.push(head);

		for (let i = 1; i <= this.initialBodyPartsCount; i += 1) {
			let bodyPartPosition: IPoint;
			bodyPartPosition = new Point(CanvasWidth / 2 - i * GameObjectSize, CanvasHeight / 2);

			const bodyPart = new SnakePart(bodyPartPosition, this.size, 'body');
			this.snakeParts.push(bodyPart);
		}
	}

	eat(): void {
		const lastPart = this.snakeParts[this.snakeParts.length - 1];
		const newPos = new Point(lastPart.position.x - GameObjectSize, lastPart.position.y);

		const bodyPart = new SnakePart(newPos, this.size, 'body');
		this.snakeParts.push(bodyPart);
	}

	moveSnake(snake: Snake) {
		switch (snake.direction) {
			case Directions.left:
				for (let i = snake.snakeParts.length - 1; i > 0; i -= 1) {
					snake.snakeParts[i].position.x = snake.snakeParts[i - 1].position.x;
					snake.snakeParts[i].position.y = snake.snakeParts[i - 1].position.y;
				}
				snake.snakeParts[0].position.x -= GameObjectSize;

				if (snake.snakeParts[0].position.x < 0) {
					snake.snakeParts[0].position.x = CanvasWidth;
				}
				break;
			case Directions.right:
				for (let i = snake.snakeParts.length - 1; i > 0; i -= 1) {
					snake.snakeParts[i].position.x = snake.snakeParts[i - 1].position.x;
					snake.snakeParts[i].position.y = snake.snakeParts[i - 1].position.y;
				}
				snake.snakeParts[0].position.x += GameObjectSize;

				if (snake.snakeParts[0].position.x + GameObjectSize > CanvasWidth) {
					snake.snakeParts[0].position.x = 0;
				}
				break;
			case Directions.up:
				for (let i = snake.snakeParts.length - 1; i > 0; i -= 1) {
					snake.snakeParts[i].position.x = snake.snakeParts[i - 1].position.x;
					snake.snakeParts[i].position.y = snake.snakeParts[i - 1].position.y;
				}
				snake.snakeParts[0].position.y -= GameObjectSize;

				if (snake.snakeParts[0].position.y < 0) {
					snake.snakeParts[0].position.y = CanvasHeight;
				}
				break;
			case Directions.down:
				for (let i = snake.snakeParts.length - 1; i > 0; i -= 1) {
					snake.snakeParts[i].position.x = snake.snakeParts[i - 1].position.x;
					snake.snakeParts[i].position.y = snake.snakeParts[i - 1].position.y;
				}
				snake.snakeParts[0].position.y += GameObjectSize;

				if (snake.snakeParts[0].position.y + GameObjectSize > CanvasHeight) {
					snake.snakeParts[0].position.y = 0;
				}
				break;
			default:
				break;
		}
	}

	changeDirection(direction: number): void {
		switch (direction) {
			case Directions.left:
				if (this.direction != Directions.right) {
					this.direction = Directions.left;
				}
				break;
			case Directions.right:
				if (this.direction != Directions.left) {
					this.direction = Directions.right;
				}
				break;
			case Directions.up:
				if (this.direction != Directions.down) {
					this.direction = Directions.up;
				}
				break;
			case Directions.down:
				if (this.direction != Directions.up) {
					this.direction = Directions.down;
				}
				break;
			default:
				break;
		}
	}
}