import { Sketch, SketchProps } from "@p5-wrapper/react";
import { P5_TEXT_FONT, colors } from "../../..";

type MySketchProps = SketchProps & {
	frequencySliderA: number;
	amplitudeSliderA: number;
	frequencySliderB: number;
	amplitudeSliderB: number;
};

export const ArcAngles2DSummingMultiple: Sketch<MySketchProps> = (p5) => {
	const windowWidth = 600;
	const circleDiameter = windowWidth * 0.25 - 100;
	const windowHeight = circleDiameter * 10;
	const circleSpacing = 20;

	const amplitudeHistoryA: number[] = [];
	const amplitudeHistoryB: number[] = [];

	let frequencySliderA: number = 0;
	let amplitudeSliderA: number = 0;
	let frequencySliderB: number = 0;
	let amplitudeSliderB: number = 0;
	let phaseA: number = 0;
	let phaseB: number = 0;

	p5.setup = () => {
		p5.createCanvas(windowWidth, windowHeight);
		p5.textFont(P5_TEXT_FONT);
	};

	p5.updateWithProps = (props) => {
		if (props.frequencySliderA) frequencySliderA = props.frequencySliderA;
		if (props.amplitudeSliderA) amplitudeSliderA = props.amplitudeSliderA;
		if (props.frequencySliderB) frequencySliderB = props.frequencySliderB;
		if (props.amplitudeSliderB) amplitudeSliderB = props.amplitudeSliderB;
	};

	const drawCoordinateSystemX = (color: string, yOffset: number) => {
		p5.push();
		p5.stroke(color);
		p5.point(0, 0, 0);
		p5.line(-p5.width * 0.5, yOffset, p5.width * 0.5, yOffset);
		p5.pop();
	};
	const drawCoordinateSystemY = (color: string) => {
		p5.push();
		p5.stroke(color);
		p5.point(0, 0, 0);
		p5.line(0, -p5.height * 0.5, 0, p5.height * 0.5);
		p5.pop();
	};

	const drawCoordinateSystem = () => {
		drawCoordinateSystemX(
			colors.lightGrey,
			-circleDiameter * 4 + circleSpacing
		);
		drawCoordinateSystemX(colors.lightGrey, -circleDiameter);

		// ==================== RESULT ====================
		drawCoordinateSystemX(colors.lightGrey, circleDiameter - circleSpacing);
		drawCoordinateSystemX(
			colors.lightGrey,
			circleDiameter * 2 - circleSpacing
		);
		drawCoordinateSystemX(
			colors.darkGrey,
			circleDiameter * 3 - circleSpacing
		);
		drawCoordinateSystemX(
			colors.lightGrey,
			circleDiameter * 4 - circleSpacing
		);
		drawCoordinateSystemX(
			colors.lightGrey,
			circleDiameter * 5 - circleSpacing
		);

		drawCoordinateSystemY(colors.lightGrey);
	};

	const drawArc = (
		size: number,
		arcs: number,
		yOffset: number = 0,
		color: string
	) => {
		p5.push();
		p5.noFill();
		p5.stroke(color);
		p5.arc(0, yOffset, size, size, arcs, 0);
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

	const timeRamp = (phase: number, frequency: number) => {
		phase += p5.deltaTime * 0.001 * frequency;
		phase = phase % 1;
		return phase;
	};

	const drawPointAndLinesToCircleCircumference = (
		angleInRadians: number,
		radius: number,
		yOffset: number = 0,
		color: string
	) => {
		const x = radius * p5.cos(angleInRadians);
		const y = radius * p5.sin(angleInRadians) + yOffset;

		p5.push();
		p5.stroke(colors.lightGrey);

		p5.line(0, 0 + yOffset, x, y); // center to dot

		p5.stroke(color);
		p5.line(x, y, circleDiameter * 4 + circleDiameter, y); // dot to right edge of waveform
		p5.fill(color);
		p5.circle(x, y, circleDiameter * 0.05);
		p5.pop();
	};

	const drawTangentLine = (yOffset: number = 0, yScaler: number) => {
		p5.stroke(colors.darkGrey);
		p5.line(
			circleDiameter,
			yOffset + -circleDiameter * yScaler,
			circleDiameter,
			yOffset + circleDiameter * yScaler
		);
	};

	const drawWaveForm = (
		amplitudeHistory: number[],
		amplitudeMultiplier: number,
		yOffset: number = 0,
		color: string
	) => {
		p5.beginShape();
		p5.noFill();
		// draw a vertex for each time sample in the amplitudeHistory array
		for (let i = 0; i < amplitudeHistory.length; i++) {
			const x = i + circleDiameter;

			// amplitudeHistory[i] is a value between 0 and 1
			// multiply by 2PI to get a value between 0 and 2PI
			// take the sine of that value to get a value between -1 and 1
			// multiply by the circleDiameter to get a value between -circleDiameter and circleDiameter
			const y =
				yOffset +
				circleDiameter *
					p5.sin(p5.PI * 2 * amplitudeHistory[i]) *
					amplitudeMultiplier;

			p5.stroke(color);
			p5.vertex(x, y);
		}
		p5.endShape();

		// if the array is longer than 4 times the circle diameter, remove the oldest value at the beginning
		amplitudeHistory.length > circleDiameter * 4 &&
			amplitudeHistory.shift();
	};

	const drawWaveformResult = (
		ampHistoryA: number[],
		amplitudeMultiplierA: number,
		ampHistoryB: number[],
		amplitudeMultiplierB: number,
		yOffset: number = 0,
		color: string
	) => {
		p5.beginShape();
		p5.noFill();
		// draw a vertex for each time sample in the amplitudeHistory array
		for (let i = 0; i < ampHistoryA.length; i++) {
			const x = i + circleDiameter;
			const y =
				yOffset +
				circleDiameter *
					p5.sin(p5.PI * 2 * ampHistoryA[i]) *
					amplitudeMultiplierA +
				circleDiameter *
					p5.sin(p5.PI * 2 * ampHistoryB[i]) *
					amplitudeMultiplierB;

			p5.stroke(color);
			p5.vertex(x, y);
		}
		p5.endShape();
	};

	const drawText = (
		circleDiameter: number,
		radians: number,
		yOffset: number = 0
	) => {
		const xOffset = 8;
		p5.noStroke();
		p5.fill(colors.lightGrey);
		p5.textSize(circleDiameter * 0.3);
		p5.text(
			`Radians: ${(radians * -1).toFixed(2)} `,
			circleDiameter + xOffset,
			yOffset - 15 - circleDiameter * 0.5
		);
		p5.text(
			`Angle: ${(radians * -1 * (180 / p5.PI)).toFixed(0)} `,
			circleDiameter + xOffset,
			yOffset - circleDiameter * 0.5
		);
	};

	const drawWaveformSystem = (
		yOffset: number,
		radians: number,
		color: string,
		amplitudeHistory: number[] = [],
		amplitudeMultiplier: number,
		isResult: boolean = false
	) => {
		p5.fill(color);

		if (!isResult) {
			drawArc(
				circleDiameter * 0.25 * amplitudeMultiplier,
				radians,
				yOffset,
				color
			); // draw center arc
			drawCircle(0, yOffset, circleDiameter * amplitudeMultiplier); // draw unit circle

			drawPointAndLinesToCircleCircumference(
				radians,
				circleDiameter * amplitudeMultiplier,
				yOffset,
				color
			);

			drawText(circleDiameter, radians, yOffset);
		}

		drawTangentLine(yOffset, 1); // draw vertical tangent line

		drawWaveForm(amplitudeHistory, amplitudeMultiplier, yOffset, color);
	};

	p5.draw = () => {
		p5.angleMode(p5.RADIANS); // use radians instead of degrees for angle measurements

		phaseA = timeRamp(phaseA, frequencySliderA); // 0.5 Hz, counter
		phaseB = timeRamp(phaseB, frequencySliderB); // 0.5 Hz, counter
		const radiansA = p5.TWO_PI * phaseA * -1; // convert time to radians
		const radiansB = p5.TWO_PI * phaseB * -1; // convert time to radians

		p5.background(colors.primary);
		p5.translate(2 * circleDiameter, windowHeight * 0.5); // position the coordinate system

		p5.noStroke();
		drawCoordinateSystem();

		amplitudeHistoryA.push(1 - phaseA); // push current time to the amplitudeHistory array
		amplitudeHistoryB.push(1 - phaseB); // push current time to the amplitudeHistory array

		drawWaveformSystem(
			-p5.height * 0.5 + circleDiameter + circleSpacing,
			radiansA,
			colors.accent3,
			amplitudeHistoryA,
			amplitudeSliderA,
			false
		);
		drawWaveformSystem(
			-circleDiameter,
			radiansB,
			colors.accent2,
			amplitudeHistoryB,
			amplitudeSliderB,
			false
		);

		drawTangentLine(
			p5.height * 0.5 - circleDiameter * 2 - circleSpacing,
			2
		); // draw vertical tangent line
		drawWaveformResult(
			amplitudeHistoryA,
			amplitudeSliderA,
			amplitudeHistoryB,
			amplitudeSliderB,
			p5.height * 0.5 - circleDiameter * 2 - circleSpacing,
			colors.secondary
		);
	};
};
