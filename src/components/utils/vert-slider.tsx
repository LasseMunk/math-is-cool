import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";
import { styled, Box } from "@mui/system";

export type VerticalSliderProps = {
	value: number;
	setValue: (value: number) => void;
	min: number;
	max: number;
	step: number;
	buttonColor: string;
	height?: number;
};

export default function VerticalSlider(props: VerticalSliderProps) {
	const {
		value,
		setValue,
		min,
		max,
		step,
		buttonColor,
		height = 100,
	} = props;

	return (
		<Box height={height}>
			<Slider
				buttonColor={buttonColor}
				orientation='vertical'
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={(_, value) => setValue(value as number)}
			/>
		</Box>
	);
}

const Slider = styled(BaseSlider)(
	(prop: { buttonColor: string }) => `
    color: #2b2b2b;
    background: transparent;
    height: 95%;
    width: 1rem;
    border-radius: 0px;
    display: inline-block;
    position: relative;
    margin-top: 0.75rem;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;


  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    height: 100%;
    width: inherit;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.4;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    width: inherit;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: ${prop.buttonColor};
    left: 50%;
    -webkit-transform: translate(-50%, 50%);
    -moz-transform: translate(-50%, 50%);
    -ms-transform: translate(-50%, 50%);
    transform: translate(-50%, 50%);
    outline: none;
    }
  }
`
);
