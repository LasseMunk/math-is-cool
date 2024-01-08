import "./App.css";
import { AmplitudePhaseUnitCircle } from "./components/index.ts";
// import { MarkdownDescription } from "./components/markdown/markdown-description.tsx";
// import { Vectors } from "./components/vectors/vectors.tsx";

const audioContext = new AudioContext();

function App() {
	return (
		<>
			{/* <MarkdownDescription /> */}
			<AmplitudePhaseUnitCircle audioContext={audioContext} />
			{/* <Vectors /> */}
		</>
	);
}

export default App;
