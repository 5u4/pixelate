import React from "react";
import { Pixelater } from "../components/Pixelater";
import { Uploader } from "../components/Uploader";
import { useSourceValue } from "../store/source";

const PIXELATE_MAX_WIDTH = 512;
const PIXELATE_MAX_HEIGHT = 512;

export const index: React.FC = () => {
  const source = useSourceValue();

  return (
    <div>
      {source === undefined ? (
        <Uploader />
      ) : (
        <Pixelater
          maxWidth={PIXELATE_MAX_WIDTH}
          maxHeight={PIXELATE_MAX_HEIGHT}
        />
      )}
    </div>
  );
};

export default index;
