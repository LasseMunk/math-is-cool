import { P5CanvasInstance } from "@p5-wrapper/react";
import { colors } from "../../..";

export const Vectors1 = (p5: P5CanvasInstance) => {
	const windowWidth = 400;
	const windowHeight = 400;
	const units = 8;

	const triLarge = [
		{ x: -3, y: -3 },
		{ x: 1, y: 2 },
		{ x: 2, y: -2 },
	];

	const triSmall = [
		{ x: -1, y: -1 },
		{ x: -1, y: 1 },
		{ x: 1, y: -1 },
	];

	const squareSmall = [
		{ x: -1, y: 0 },
		{ x: 0, y: -1 },
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
	];

	const reactSmall = [
		{ x: 2, y: 1 },
		{ x: 2, y: 3 },
		{ x: 3, y: 3 },
		{ x: 3, y: 1 },
	];

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
		ramp: number,
		strokeColor: string
	) => {
		const radians = ramp * p5.TWO_PI;
		const start = convertCoordinateToPixels(xStart, yStart);
		const end = convertCoordinateToPixels(xEnd, yEnd);
		p5.push();
		p5.stroke(strokeColor);
		p5.strokeWeight(3);
		p5.drawingContext.setLineDash([5, 2 + 10 * (1 + p5.cos(radians))]); //create the dashed line pattern here
		p5.line(start.x, start.y, end.x, end.y);
		p5.pop();
	};

	const drawPositionText = (
		position: { x: number; y: number },
		color: string,
		multiplier: number
	) => {
		const positionPixels = convertCoordinateToPixels(
			position.x * multiplier,
			position.y * multiplier
		);
		const positionText = `(${position.x * multiplier},${
			position.y * multiplier
		})`;
		p5.noStroke();
		p5.fill(color);
		p5.textSize(15);
		p5.text(positionText, positionPixels.x, positionPixels.y);
	};

	const drawArrayOfPoints = (
		points: {
			x: number;
			y: number;
		}[],
		strokeColor: string,
		multiplier: number
	) => {
		for (let i = 0; i < points.length; i++) {
			drawLine(
				points[i].x * multiplier,
				points[i].y * multiplier,
				points[(i + 1) % points.length].x * multiplier,
				points[(i + 1) % points.length].y * multiplier,
				time,
				strokeColor
			);
		}
	};
	p5.draw = () => {
		timeRamp(0.25); // 0.5 Hz, counter

		p5.background(colors.primary);

		p5.noStroke();
		drawCoordinateSystem();

		drawArrayOfPoints(triLarge, colors.secondary, 1);
		drawPositionText(triLarge[1], colors.darkGrey, 1);

		drawArrayOfPoints(triSmall, colors.accent1, 1);
		drawPositionText(triSmall[1], colors.darkGrey, 1);

		drawArrayOfPoints(squareSmall, colors.accent2, 2);
		drawPositionText(squareSmall[1], colors.darkGrey, 2);

		drawArrayOfPoints(reactSmall, colors.accent3, 1);
		drawPositionText(reactSmall[1], colors.darkGrey, 1);
	};
};
