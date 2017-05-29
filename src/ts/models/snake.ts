import { Position } from '../interfaces/position';
import { Directions } from '../enums/directions';
import { SnakeParts } from '../enums/snakeParts';
import { SnakePart } from './snakePart';

export class Snake {
	snakeParts: [SnakePart];
	bodyPartsCount: number;
	direction: Directions;
	constructor(headPosition: Position) {
		this.bodyPartsCount = 3;
		this.direction = Directions.right;
	}

	init(): void {

	}

	addBodyPart(): void {
		
	}
}