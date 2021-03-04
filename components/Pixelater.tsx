import React, { useCallback, useRef, useState } from "react";
import { useSourceValue } from "../store/source";
import { ImageUtil } from "../utils/ImageUtil";
import { NewUploadButton } from "./NewUploadButton";
import { NumberInput } from "./NumberInput";
import { Slider } from "./Slider";

export const Pixelater: React.FC = () => {
  const origImgRef = useRef<HTMLImageElement>(null);
  const source = useSourceValue();
  const [blockSize, setBlockSize] = useState(1);
  const [pixelateSrc, setPixelateSrc] = useState("");
  const [dimension, setDimension] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  const onBlockSizeChange = useCallback(
    (v: number) => {
      if (!origImgRef.current) return;
      const img = origImgRef.current;
      const imgUtil = ImageUtil.instance;
      const { w, h } = dimension;
      const data = imgUtil.getImageDataFromElement(img, w, h);
      imgUtil.pixelate(data, v);
      setBlockSize(v);
      setPixelateSrc(imgUtil.getSrcFromImageData(data));
    },
    [origImgRef, dimension, setBlockSize, setPixelateSrc]
  );

  const onOrigImgLoad = useCallback(() => {
    if (!origImgRef.current) return;
    const img = origImgRef.current;
    if (img.clientWidth !== 0 && img.clientHeight !== 0)
      setDimension({ w: img.clientWidth, h: img.clientHeight });
  }, [origImgRef]);

  return (
    <div>
      <div className="shadow-lg rounded-2xl p-4 border-red-200 border-4 mx-2 my-4 md:w-128 sm:w-96 w-80">
        <img
          className="w-full h-full"
          ref={origImgRef}
          src={source}
          style={{
            display: blockSize !== 1 ? "none" : "block",
          }}
          onLoad={onOrigImgLoad}
        />
        {blockSize > 1 && (
          <img
            className="w-full h-full"
            style={{ display: blockSize === 1 ? "none" : "block" }}
            src={pixelateSrc}
          />
        )}
      </div>

      <div className="flex flex-col mt-4 mb-8">
        <div className="flex flex-row items-end my-2">
          <span className="md:text-2xl text-xl mr-1 font-semibold tracking-tight md:tracking-tighter leading-tight">
            Block Size:
          </span>
          <NumberInput value={blockSize} onChange={onBlockSizeChange} />
        </div>
        <Slider value={blockSize} onChange={onBlockSizeChange} />
      </div>

      <div className="mt-6">
        <NewUploadButton />
      </div>
    </div>
  );
};
