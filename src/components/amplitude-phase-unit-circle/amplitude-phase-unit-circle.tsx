import { ReactP5Wrapper } from "@p5-wrapper/react";
import { ArcAngles2DSummingMultiple } from "./sketches";
import { useState } from "react";

export const AmplitudePhaseUnitCircle = () => {
	const [frequencySliderA, setFrequencySliderA] = useState<number>(0.5);
	const [amplitudeSliderA, setAmplitudeSliderA] = useState<number>(1);
	const [frequencySliderB, setFrequencySliderB] = useState<number>(0.5);
	const [amplitudeSliderB, setAmplitudeSliderB] = useState<number>(1);

	return (
		<>
			<div>
				<input
					type='range'
					min={0}
					max={4}
					value={frequencySliderA}
					step={0.01}
					onChange={(e) =>
						setFrequencySliderA(parseFloat(e.target.value))
					}
				/>
				<input
					type='range'
					min={0}
					max={1}
					value={amplitudeSliderA}
					step={0.01}
					onChange={(e) =>
						setAmplitudeSliderA(parseFloat(e.target.value))
					}
				/>
				<input
					type='range'
					min={0}
					max={4}
					value={frequencySliderB}
					step={0.01}
					onChange={(e) =>
						setFrequencySliderB(parseFloat(e.target.value))
					}
				/>
				<input
					type='range'
					min={0}
					max={1}
					value={amplitudeSliderB}
					step={0.01}
					onChange={(e) =>
						setAmplitudeSliderB(parseFloat(e.target.value))
					}
				/>
			</div>
			<ReactP5Wrapper
				sketch={ArcAngles2DSummingMultiple}
				frequencySliderA={frequencySliderA}
				amplitudeSliderA={amplitudeSliderA}
				frequencySliderB={frequencySliderB}
				amplitudeSliderB={amplitudeSliderB}
			/>
		</>
	);
};
