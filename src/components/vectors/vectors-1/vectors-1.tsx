import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "../../..";

export const Vectors1 = (p5: P5CanvasInstance) => {
	const windowWidth = 400;
	const windowHeight = 400;
	const units = 8;

	p5.setup = () => {
		p5.createCanvas(windowWidth, windowHeight);
		p5.textFont("Courier New");
	};

	const convertCoordinateToPixels = (x: number, y: number) => {
		const xCenterOffset = p5.width * 0.5;
		const yCenterOffset = p5.height * 0.5;
		const xInPixels = p5.width * (1 / units) * x + xCenterOffset;
		const yInPixels = p5.height * (1 / units) * (y * -1) + yCenterOffset;
		return { x: xInPixels, y: yInPixels };
	};

	const drawCoordinateSystem = () => {
		const strokeWeight = 4;

		p5.push();
		p5.stroke(colors.lightGrey);
		p5.strokeWeight(1);
		p5.line(p5.width * 0.5, 0, p5.width * 0.5, p5.height);
		p5.line(0, p5.height * 0.5, p5.width, p5.height * 0.5);

		p5.stroke(colors.lightGrey);
		p5.strokeWeight(strokeWeight);
		for (let i = -units * 0.5 + 1; i < units * 0.5; i++) {
			for (let j = -units * 0.5 + 1; j < units * 0.5; j++) {
				const coordinate = convertCoordinateToPixels(i, j);
				p5.point(coordinate.x, coordinate.y);
			}
		}
		p5.pop();
	};

	let time: number = 0;

	const timeRamp = (frequency: number) => {
		time += p5.deltaTime * 0.001 * frequency;
		time = time % 1;
		return time;
	};

	const drawLine = (
		xStart: number,
		yStart: number,
		xEnd: number,
		yEnd: number,
		ramp: number
	) => {
		const radians = ramp * p5.TWO_PI;
		const start = convertCoordinateToPixels(xStart, yStart);
		const end = convertCoordinateToPixels(xEnd, yEnd);
		p5.push();
		p5.stroke(colors.secondary);
		p5.strokeWeight(2);
		p5.drawingContext.setLineDash([5, 10 * (1 + p5.cos(radians))]); //create the dashed line pattern here
		p5.line(start.x, start.y, end.x, end.y);
		p5.pop();
	};

	/*
	const drawText = (
		p5: P5CanvasInstance,
		circleDiameter: number,
		radians: number,
		windowHeight: number
	) => {
		p5.noStroke();
		p5.fill(colors.lightGrey);
		p5.textSize(10);
		p5.text(
			`Radians: ${radians.toFixed(2)} `,
			circleDiameter,
			windowHeight * 0.5 - 20
		);
		p5.text(
			`Angle: ${(radians * (180 / p5.PI)).toFixed(0)} `,
			circleDiameter,
			windowHeight * 0.5 - 5
		);
	};
	*/
	const coords = [
		{ x: -3, y: -3 },
		{ x: 1, y: 2 },
	];
	p5.draw = () => {
		timeRamp(0.25); // 0.5 Hz, counter

		p5.background(colors.primary);

		p5.noStroke();
		drawCoordinateSystem();

		drawLine(coords[0].x, coords[0].y, coords[1].x, coords[1].y, time);

		// drawText(p5, 100, radians, windowHeight);
	};
};
