import { Position } from '../interfaces/position';
import { Size } from '../interfaces/size';
import { GameObject } from './gameObject';

export class SnakePart extends GameObject {
	next: GameObject;
	constructor(pos: Position, size: Size, kind: string) {
		super(pos, size, kind);
		this.next = null;
	}

	getNext(): GameObject {
		return this.next;
	}
	setNext(value: GameObject): void {
		this.next = value;
	}
}