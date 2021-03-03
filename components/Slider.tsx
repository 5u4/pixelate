import React from "react";

interface Props {
  value: number;
  max?: number;
  onChange: (value: number) => void;
}

export const Slider: React.FC<Props> = ({ value, onChange, max = 16 }) => {
  return (
    <div>
      {value}
      <input
        type="range"
        value={value}
        min={1}
        max={max}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
};
