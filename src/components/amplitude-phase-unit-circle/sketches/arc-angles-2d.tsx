import { P5CanvasInstance } from "@p5-wrapper/react";
import { P5_TEXT_FONT, colors } from "../../..";

export const ArcAngles2D = (p5: P5CanvasInstance) => {
	const windowWidth = 600;
	const circleDiameter = windowWidth * 0.25 - 100;
	const windowHeight = circleDiameter * 4;

	const amplitudeHistory: number[] = [];

	p5.setup = () => {
		p5.createCanvas(windowWidth, windowHeight);
		p5.textFont(P5_TEXT_FONT);
	};

	const drawCoordinateSystem = (systemMultiplier: number) => {
		p5.push();
		p5.stroke(colors.lightGrey);
		p5.point(0, 0, 0);
		p5.line(
			0,
			-p5.height * systemMultiplier,
			0,
			p5.height * systemMultiplier
		);
		p5.line(
			-p5.width * systemMultiplier,
			0,
			p5.width * systemMultiplier,
			0
		);
		p5.pop();
	};

	const drawArc = (size: number, arcs: number) => {
		p5.push();
		p5.noFill();
		p5.stroke(colors.secondary);
		p5.arc(0, 0, size, size, 0, arcs);
		p5.pop();
	};

	const drawCircle = (x: number, y: number, diameter: number) => {
		p5.ellipseMode(p5.RADIUS);
		p5.push();
		p5.noFill();
		p5.stroke(colors.darkGrey);
		p5.circle(x, y, diameter);
		p5.pop();
	};

	let time: number = 0;

	const timeRamp = (frequency: number) => {
		time += p5.deltaTime * 0.001 * frequency;
		time = time % 1;
		return time;
	};

	const drawPointOnCircleCircumference = (
		angleInRadians: number,
		radius: number
	) => {
		const x = radius * p5.cos(angleInRadians);
		const y = radius * p5.sin(angleInRadians);

		p5.push();
		p5.stroke(colors.lightGrey);

		p5.line(0, 0, x, y);

		p5.stroke(colors.secondary);
		p5.line(x, y, circleDiameter * 4 + circleDiameter, y);
		p5.fill(colors.secondary);
		p5.circle(x, y, circleDiameter * 0.05);
		p5.pop();
	};

	const drawTangentLine = () => {
		p5.stroke(colors.darkGrey);
		p5.line(
			circleDiameter,
			-circleDiameter,
			circleDiameter,
			circleDiameter
		);
	};

	const drawWaveForm = () => {
		p5.beginShape();
		p5.noFill();
		// draw a vertex for each time sample in the amplitudeHistory array
		for (let i = 0; i < amplitudeHistory.length; i++) {
			const x = i + circleDiameter;

			// amplitudeHistory[i] is a value between 0 and 1
			// multiply by 2PI to get a value between 0 and 2PI
			// take the sine of that value to get a value between -1 and 1
			// multiply by the circleDiameter to get a value between -circleDiameter and circleDiameter
			const y = circleDiameter * p5.sin(p5.PI * 2 * amplitudeHistory[i]);

			p5.stroke(colors.secondary);
			p5.vertex(x, y);
		}
		p5.endShape();

		// if the array is longer than 4 times the circle diameter, remove the oldest value at the beginning
		amplitudeHistory.length > circleDiameter * 4 &&
			amplitudeHistory.shift();
	};

	const drawText = (
		p5: P5CanvasInstance,
		circleDiameter: number,
		radians: number,
		windowHeight: number
	) => {
		p5.noStroke();
		p5.fill(colors.lightGrey);
		p5.textSize(circleDiameter * 0.3);
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

	p5.draw = () => {
		timeRamp(0.25); // 0.5 Hz, counter
		const radians = p5.PI * 2 * time; // convert time to radians
		amplitudeHistory.push(time); // push current time to the amplitudeHistory array

		p5.background(colors.primary);
		p5.translate(2 * circleDiameter, windowHeight * 0.5); // position the coordinate system

		p5.noStroke();
		drawCoordinateSystem(0.5);
		drawArc(circleDiameter * 0.25, radians); // draw center arc

		p5.fill(colors.primary);

		drawCircle(0, 0, circleDiameter); // draw unit circle

		drawPointOnCircleCircumference(radians, circleDiameter);

		drawTangentLine(); // draw vertical tangent line

		drawWaveForm();

		drawText(p5, circleDiameter, radians, windowHeight);
	};
};
