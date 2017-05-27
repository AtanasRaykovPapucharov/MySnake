import { GameObject } from './gameObject.model';

export class Food extends GameObject {
	kind: string;
	constructor(pos, size, kind) {
		super(pos, size);
		this.kind = kind;
	}
}