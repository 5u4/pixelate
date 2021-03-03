import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  value: number;
  max?: number;
  onChange: (value: number) => void;
}

export const NumberInput: React.FC<Props> = ({ value, onChange, max = 16 }) => {
  return (
    <ChakraNumberInput
      className="ml-2"
      width={88}
      defaultValue={value}
      min={1}
      max={max}
      value={value}
      onChange={(_, v) => onChange(v)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  );
};
