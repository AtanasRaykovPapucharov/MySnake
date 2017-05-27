import { Position } from './interfaces/position';
import { Size } from './interfaces/size';
import { Object } from './interfaces/object';

export class GameObject implements Object {
	position: Position;
	size: Size;

	constructor(pos, size) {
		this.position = pos;
		this.size = size;
	}
}