import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./App.css";
import { ArcAngles } from "./sketches/arc-angles/arc-angles";

function App() {
	return (
		<>
			<ReactP5Wrapper sketch={ArcAngles} />
		</>
	);
}

export default App;
