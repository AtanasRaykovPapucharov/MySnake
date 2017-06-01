import {
	CanvasWidth,
	CanvasHeight,
	GameObjectSize,
	CanvasBackgroundColor,
	FoodColor,
	HeadColor,
	BodyPartColor,
	BorderColor
} from './constants';

export class Renderer {
	canvas: HTMLCanvasElement;
	context: any;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
	}

	initCanvas(): void {
		this.canvas.width = CanvasWidth;
		this.canvas.height = CanvasHeight;
		this.context.fillStyle = CanvasBackgroundColor;
		this.context.fillRect(0, 0, CanvasWidth, CanvasHeight);
		this.context.strokeStyle = 'black';
		this.context.strokeRect(0, 0, CanvasWidth, CanvasHeight);
	}

	drawSnake(snake: any): void {
		const parts = snake.snakeParts;

		for (let i = 0; i < parts.length; i += 1) {
			let part = parts[i];
			switch (part.kind) {
				case 'head':
					this.context.fillStyle = HeadColor;
					this.context.fillRect(part.position.x, part.position.y, part.size.x, part.size.y);
					this.context.strokeStyle = BorderColor;
					this.context.strokeRect(part.position.x, part.position.y, part.size.x, part.size.y);
					break;
				case 'body':
					this.context.fillStyle = BodyPartColor;
					this.context.fillRect(part.position.x, part.position.y, part.size.x, part.size.y);
					this.context.strokeStyle = BorderColor;
					this.context.strokeRect(part.position.x, part.position.y, part.size.x, part.size.y);
					break;
			}
		}
	}

	drawFood(food: any): void {
		const centerX = food.position.x + GameObjectSize / 2;
		const centerY = food.position.y + GameObjectSize / 2;

		this.context.beginPath();
		this.context.arc(centerX, centerY, GameObjectSize / 2, 0, 2 * Math.PI, false);
		this.context.fillStyle = FoodColor;
		this.context.fill();
		this.context.lineWidth = 1;
		this.context.strokeStyle = BorderColor;
		this.context.stroke();
	}

	clear(): void {
		this.context.clearRect(0, 0, CanvasWidth, CanvasHeight);
	}
}
