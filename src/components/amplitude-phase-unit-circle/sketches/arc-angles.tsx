import { P5CanvasInstance } from "@p5-wrapper/react";
import { FontShareTechMono } from "../../../fonts/share-tech-mono-font";
import { colors } from "../../..";

// https://editor.p5js.org/ffd8/sketches/TFVEgMPgj

/*
  Q: 
  - what if there was a default font ready for WEBGL mode??
  
  A:
  - smallest GFonts, http://www.oxfordshireweb.com/smallest-file-size-google-web-fonts/
  - 'share tech mono' (43kb), https://fonts.google.com/specimen/Share+Tech+Mono
  - file to base64: https://stackoverflow.com/a/59116157/10885535
  - code start: https://discourse.processing.org/t/fonts-loading-base64-encoded-fonts/23721/2
  
  Q:
  - other/better/smaller/open font? sans-serif vs mono
*/

export const ArcAngles = (p5: P5CanvasInstance) => {
	const windowWidth = 600;
	const windowHeight = 600;

	// const arcMultiplier = 0.5;

	let myFont: any;
	p5.preload = () => {
		myFont = p5.loadFont(FontShareTechMono); // load a font via base64?!
	};
	p5.setup = () => {
		p5.createCanvas(windowWidth, windowHeight, p5.WEBGL);
		p5.textFont(myFont);
		// p5.smooth();
	};

	// const setProjection = () => {
	// 	const cam_dist = p5.easycam.getDistance();
	// 	const oscale = cam_dist * 0.001;
	// 	const ox = (width / 2) * oscale;
	// 	const oy = (height / 2) * oscale;
	// 	ortho(-ox, +ox, -oy, +oy, -10000, 10000);
	// 	easycam.setPanScale(0.004 / sqrt(cam_dist));
	// }
	const drawCoordinateSystem = (systemMultiplier: number) => {
		p5.push();
		p5.stroke(colors.lightGrey);
		p5.point(0, 0, 0);
		p5.line(
			0,
			-p5.height * systemMultiplier,
			0,
			0,
			p5.height * systemMultiplier,
			0
		);
		p5.line(
			-p5.width * systemMultiplier,
			0,
			0,
			p5.width * systemMultiplier,
			0,
			0
		);
		p5.pop();
	};

	const drawArc = (sizeMultiplier: number, arcs: number) => {
		// https://p5js.org/reference/#/p5/arc
		p5.push();
		p5.noStroke();
		p5.fill(colors.secondary);
		p5.arc(
			0,
			0,
			p5.width * sizeMultiplier,
			p5.height * sizeMultiplier,
			0,
			arcs
		);
		p5.pop();
	};

	const drawCircle = (x: number, y: number, diameter: number) => {
		p5.ellipseMode(p5.RADIUS);
		p5.push();

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

	p5.draw = () => {
		timeRamp(0.5);

		p5.noStroke();
		drawCoordinateSystem(0.5);
		drawArc(0.1, p5.PI * 2 * time);

		p5.fill(colors.primary);
		p5.translate(0, 0, -p5.width / 2);
		p5.plane(p5.width * 2, p5.height * 2);

		drawCircle(0, 0, windowWidth * 0.5);
		// spinning type
		// p5.rotateY(p5.radians(-p5.frameCount / 2));
		// p5.textSize(16);
		// p5.textAlign("left");

		// p5.text("This is a test font", 0, 0);
	};
};
