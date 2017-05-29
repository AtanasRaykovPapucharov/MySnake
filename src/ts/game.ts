import { Snake } from './models/snake';
import { GameObjectSize} from './utils/constants';
import { Renderer } from './utils/renderer';

export class Game {
	constructor() {}

	init(): void {
		alert('Game must work!');
		const snake = new Snake();
	}
}