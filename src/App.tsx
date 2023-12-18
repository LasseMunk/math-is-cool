import "./App.css";
import { AmplitudePhaseUnitCircle } from "./components/index.ts";
import { MarkdownDescription } from "./components/markdown/markdown-description.tsx";

function App() {
	return (
		<>
			<MarkdownDescription />
			<AmplitudePhaseUnitCircle />
		</>
	);
}

export default App;
