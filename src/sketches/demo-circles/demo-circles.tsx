import { P5CanvasInstance } from "@p5-wrapper/react";

// https://editor.p5js.org/ffd8/sketches/TFVEgMPgj

export const DemoCircles = (p5: P5CanvasInstance) => {
	let windowWidth = 600;
	let windowHeight = 400;

	let _text: any;
	let text = "yolo";
	let textSize = 100;
	let textOffsetH = 0;
	let textOffsetW = 10;

	p5.setup = () => {
		p5.createCanvas(windowWidth, windowHeight, p5.WEBGL);

		_text = p5.createGraphics(
			window.innerWidth - 4,
			window.innerHeight - 4
		);
		_text.textFont("Helvetica");
		// _text.textFont("Source Code Pro");
		_text.textAlign(p5.CENTER);
		_text.textSize(50);
		_text.fill(255, 0, 0);
		_text.noStroke();
	};

	p5.draw = () => {
		p5.background("#f9eacb");
		p5.plane(windowWidth, windowHeight);
		p5.noStroke();

		_text.text(text, textOffsetW + textSize, textOffsetH + textSize);
		p5.texture(_text);
	};
};
