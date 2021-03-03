import {
  Box,
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  value: number;
  max?: number;
  onChange: (value: number) => void;
}

export const Slider: React.FC<Props> = ({ value, onChange, max = 16 }) => {
  return (
    <ChakraSlider
      value={value}
      defaultValue={value}
      min={1}
      max={max}
      step={1}
      onChange={onChange}
    >
      <SliderTrack bg="red.100">
        <Box position="relative" right={10} />
        <SliderFilledTrack bg="tomato" />
      </SliderTrack>
      <SliderThumb boxSize={6} borderColor="tomato" borderWidth="medium" />
    </ChakraSlider>
  );
};
