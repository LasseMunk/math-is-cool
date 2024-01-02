import { ReactP5Wrapper } from "@p5-wrapper/react";
import { ArcAngles2DSummingMultiple } from "./sketches";
import { useState } from "react";

export const AmplitudePhaseUnitCircle = () => {
	const [frequencySliderA, setFrequencySliderA] = useState<number>(0.5);
	const [frequencySliderB, setFrequencySliderB] = useState<number>(0.5);

	return (
		<>
			<input
				type='range'
				min={0.1}
				max={4}
				value={frequencySliderA}
				step={0.01}
				onChange={(e) =>
					setFrequencySliderA(parseFloat(e.target.value))
				}
			/>
			<input
				type='range'
				min={0.1}
				max={4}
				value={frequencySliderB}
				step={0.01}
				onChange={(e) =>
					setFrequencySliderB(parseFloat(e.target.value))
				}
			/>
			<ReactP5Wrapper
				sketch={ArcAngles2DSummingMultiple}
				frequencySliderA={frequencySliderA}
				frequencySliderB={frequencySliderB}
			/>
		</>
	);
};
