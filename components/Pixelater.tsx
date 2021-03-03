import React, { useRef, useState } from "react";
import { useSourceState } from "../store/source";
import { ImageUtil } from "../utils/ImageUtil";
import { Slider } from "./Slider";

interface Props {
  maxWidth?: number;
  maxHeight?: number;
}

export const Pixelater: React.FC<Props> = ({ maxWidth, maxHeight }) => {
  const origImgRef = useRef<HTMLImageElement>(null);
  const [source, setSource] = useSourceState();
  const [blockSize, setBlockSize] = useState(1);
  const [pixelateSrc, setPixelateSrc] = useState("");

  return (
    <div>
      <div>
        <img
          ref={origImgRef}
          src={source}
          style={{
            display: blockSize !== 1 ? "none" : "block",
            maxWidth,
            maxHeight,
          }}
        />
        {blockSize > 1 && (
          <img
            style={{ display: "block", maxWidth, maxHeight }}
            src={pixelateSrc}
          />
        )}
      </div>

      <Slider
        value={blockSize}
        onChange={(v) => {
          if (!origImgRef.current) return;
          const img = origImgRef.current;
          const imgUtil = ImageUtil.instance;
          const data = imgUtil.getImageDataFromElement(img);
          imgUtil.pixelate(data, v);
          setBlockSize(v);
          setPixelateSrc(imgUtil.getSrcFromImageData(data));
        }}
        max={16}
      />

      <button onClick={() => setSource(undefined)}>Back</button>
    </div>
  );
};
