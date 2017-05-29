import { Position } from '../interfaces/position';
import { Size } from '../interfaces/size';
import { GameObject } from './gameObject';

export class Food extends GameObject {
	constructor(pos: Position, size: Size, kind: string) {
		super(pos, size, kind);
	}
}