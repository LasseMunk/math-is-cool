import { Button } from "@mui/base";
import { useCallback, useEffect, useState } from "react";
import VerticalSlider from "../../utils/vert-slider";
import { colors } from "../../..";
import { Stack } from "@mui/system";

type Props = {
	audioContext: AudioContext;
};

export const AmplitudePhaseUnitCircleAudio = (props: Props) => {
	const { audioContext } = props;
	const [frequencySliderA, setFrequencySliderA] = useState<number>(200);
	const [amplitudeSliderA, setAmplitudeSliderA] = useState<number>(1);
	const [oscillatorA, setOscillatorA] = useState<OscillatorNode | null>(null);
	const [gainNodeA, setGainNodeA] = useState<GainNode | null>(null);

	const playAudio = useCallback(() => {
		if (audioContext && oscillatorA && gainNodeA) {
			oscillatorA.connect(gainNodeA).connect(audioContext.destination);
			gainNodeA.gain.value = amplitudeSliderA;
			oscillatorA.frequency.value = frequencySliderA;
			oscillatorA.start(audioContext.currentTime);
		}
	}, [
		audioContext,
		frequencySliderA,
		amplitudeSliderA,
		gainNodeA,
		oscillatorA,
	]);
	const pauseAudio = useCallback(() => {
		if (oscillatorA) {
			oscillatorA.stop(audioContext.currentTime);
		}
	}, [oscillatorA, audioContext]);

	useEffect(() => {
		const gainA = audioContext.createGain();
		setGainNodeA(gainA);

		const oscA = audioContext.createOscillator();
		setOscillatorA(oscA);
	}, [audioContext]);

	useEffect(() => {
		if (oscillatorA && gainNodeA) {
			gainNodeA.gain.value = amplitudeSliderA;
			oscillatorA.frequency.value = frequencySliderA;
		}
	}, [gainNodeA, oscillatorA, amplitudeSliderA, frequencySliderA]);

	return (
		<>
			<Stack direction='row' gap={2}>
				<Button onClick={() => playAudio()}> Play audio </Button>
				<Button onClick={() => pauseAudio()}> Stop audio </Button>
			</Stack>
			<Stack direction='row' gap={2}>
				<VerticalSlider
					buttonColor={colors.accent3}
					value={frequencySliderA}
					setValue={setFrequencySliderA}
					min={100}
					max={1000}
					step={0.01}
				/>
				<VerticalSlider
					buttonColor={colors.accent3}
					value={amplitudeSliderA}
					setValue={setAmplitudeSliderA}
					min={0}
					max={1}
					step={0.01}
				/>
			</Stack>
		</>
	);
};
