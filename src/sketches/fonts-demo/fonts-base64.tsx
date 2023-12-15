import { P5CanvasInstance } from "@p5-wrapper/react";
import { FontShareTechMono } from "../../fonts/share-tech-mono-font";

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

export const DemoBase64Font = (p5: P5CanvasInstance) => {
	let windowWidth = 600;
	let windowHeight = 400;

	let myFont: any;
	p5.preload = () => {
		myFont = p5.loadFont(FontShareTechMono); // load a font via base64?!
	};
	p5.setup = () => {
		p5.createCanvas(windowWidth, windowHeight, p5.WEBGL);
		p5.textFont(myFont);
	};

	p5.draw = () => {
		// background(255, 5) // pseudo fade for WEBGL below
		p5.fill("#f9eacb");
		p5.noStroke();
		p5.push();
		p5.translate(0, 0, -p5.width / 2);
		p5.plane(p5.width * 2, p5.height * 2);
		p5.pop();

		// spinning type
		p5.rotateY(p5.radians(-p5.frameCount / 2));
		p5.textSize(p5.width / 6);
		p5.textAlign(p5.CENTER, p5.CENTER);
		p5.fill("#ED225D");
		p5.text(
			"This is a test font",
			0,
			(p5.sin(p5.frameCount * 0.01) * p5.height) / 6
		);
	};
};
