import { IPoint } from '../interfaces/IPoint';
import { IGameObject } from '../interfaces/IGameObject';
import { Directions } from '../enums/directions';
import { Point } from './point';
import { SnakePart } from './snakePart';
import { GameObjectSize, CanvasWidth, CanvasHeight } from '../utils/constants';

export class Snake {
	snakeParts: IGameObject[];
	initialBodyPartsCount: number;
	direction: string;
	size: IPoint;

	constructor() {
		this.snakeParts = [];
		this.initialBodyPartsCount = 4;
		this.direction = Directions.right.toString();
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

	addBodyPart(): void {
		const lastPart = this.snakeParts[this.snakeParts.length - 1];
		const newPos = new Point(lastPart.position.x - GameObjectSize, lastPart.position.y);

		const bodyPart = new SnakePart(newPos, this.size, 'body');
		this.snakeParts.push(bodyPart);
	}

	changeDirection(): void {

	}

	updateSnake(snake: Snake): void {
		const parts = snake.snakeParts;
		const dir = snake.direction;
		
		switch (dir) {
			case 'right':
				for (let i = 0; i < parts.length; i += 1) {
					parts[i].position.x += GameObjectSize;
				}
				break;
			case 'left':
				break;
			case 'up':
				break;
			case 'down':
				break;
		}
	}
}