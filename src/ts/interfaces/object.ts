import { Position } from './position';
import { Size } from './size';

export interface Object {
	position: Position;
	size: Size;
	kind: string;
}