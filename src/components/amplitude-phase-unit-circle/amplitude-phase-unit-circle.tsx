import { ReactP5Wrapper } from "@p5-wrapper/react";
import { ArcAngles2DSummingMultiple } from "./sketches";
import { useState } from "react";
import { Stack } from "@mui/system";
import VerticalSlider from "../utils/vert-slider";
import { colors } from "../..";
import { SummingSinewavesDescription } from "./markdown/summing-sinewaves-description";
import Grid from "@mui/system/Unstable_Grid/Grid";

export const AmplitudePhaseUnitCircle = () => {
	const [frequencySliderA, setFrequencySliderA] = useState<number>(0.5);
	const [amplitudeSliderA, setAmplitudeSliderA] = useState<number>(1);
	const [frequencySliderB, setFrequencySliderB] = useState<number>(0.5);
	const [amplitudeSliderB, setAmplitudeSliderB] = useState<number>(1);

	return (
		<Grid
			xs={6}
			maxWidth={"800px"}
			border={"1px solid #bdbdbd"}
			borderRadius={2}
			padding={2}
		>
			<SummingSinewavesDescription />

			<Stack width={"100%"} direction={"row"} gap={2}>
				<ReactP5Wrapper
					sketch={ArcAngles2DSummingMultiple}
					frequencySliderA={frequencySliderA}
					amplitudeSliderA={amplitudeSliderA}
					frequencySliderB={frequencySliderB}
					amplitudeSliderB={amplitudeSliderB}
				/>
				<Stack gap={2}>
					<Stack direction={"row"} gap={2}>
						<VerticalSlider
							buttonColor={colors.accent3}
							value={frequencySliderA}
							setValue={setFrequencySliderA}
							min={0}
							max={4}
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
					<Stack direction={"row"} gap={2}>
						<VerticalSlider
							buttonColor={colors.accent2}
							value={frequencySliderB}
							setValue={setFrequencySliderB}
							min={0}
							max={4}
							step={0.01}
						/>
						<VerticalSlider
							buttonColor={colors.accent2}
							value={amplitudeSliderB}
							setValue={setAmplitudeSliderB}
							min={0}
							max={1}
							step={0.01}
						/>
					</Stack>
				</Stack>
			</Stack>
		</Grid>
	);
};
