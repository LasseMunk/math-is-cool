import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./App.css";
// import { ArcAngles } from "./sketches/arc-angles/arc-angles";
import { ArcAngles2D } from "./sketches/arc-angles/arc-angles-2d.tsx";

function App() {
	return (
		<>
			<ReactP5Wrapper sketch={ArcAngles2D} />
		</>
	);
}

export default App;
