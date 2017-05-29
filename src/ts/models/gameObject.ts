import { Position } from '../interfaces/position';
import { Size } from '../interfaces/size';
import { Object } from '../interfaces/object';

export class GameObject implements Object {
	position: Position;
	size: Size;
	kind: string;

	constructor(pos: Position, size: Size, kind: string) {
		this.position = pos;
		this.size = size;
		this.kind = kind;
	}
}