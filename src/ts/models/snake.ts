import { Position } from '../interfaces/position';
import { Size } from '../interfaces/size';
import { Directions } from '../enums/directions';
import { SnakePart } from './snakePart';
import { GameObjectSize, CanvasWidth, CanvasHeight } from '../utils/constants';

export class Snake {
	snakeParts: [SnakePart];
	initialBodyPartsCount: number;
	direction: Directions;
	size: Size;

	constructor() {
		this.direction = Directions.right;
		this.initialBodyPartsCount = 3;
		// this.size.width = GameObjectSize;
		// this.size.height = GameObjectSize;
	}

	init(): void {
		console.log(this.size);

		let headPosition: Position;
		headPosition.x = CanvasWidth / 2;
		headPosition.y = CanvasHeight / 2;

		const head = new SnakePart(headPosition, this.size, 'head');
		this.snakeParts.push(head);

		for (let i = 1; i <= this.initialBodyPartsCount; i += 1) {
			let bodyPartPosition: Position;
			bodyPartPosition.x = CanvasWidth / 2 - i * GameObjectSize;
			bodyPartPosition.y = CanvasHeight / 2;

			const bodyPart = new SnakePart(bodyPartPosition, this.size, 'bodyPart');
			this.snakeParts.push(bodyPart);
		}

		let tailPosition: Position;
		tailPosition.x = CanvasWidth / 2 - 4 * GameObjectSize;
		tailPosition.y = CanvasHeight / 2;

		const tail = new SnakePart(tailPosition, this.size, 'tail');
		this.snakeParts.push(tail);
	}

	addBodyPart(direction: string): void {
		const tail = this.snakeParts[this.snakeParts.length - 1]
		tail.position.x -= GameObjectSize;

		this.snakeParts[this.snakeParts.length - 1].kind = 'bodyPart';
		this.snakeParts.push(tail);
	}
}