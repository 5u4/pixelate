import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useSourceValue } from "../store/source";
import { ImageUtil } from "../utils/ImageUtil";
import { NewUploadButton } from "./NewUploadButton";
import { NumberInput } from "./NumberInput";
import { Slider } from "./Slider";

const MIN_MAX_BLOCK_SIZE = 16;
const MIN_RES_DIM = 16;

export const Pixelater: React.FC = () => {
  const origImgRef = useRef<HTMLImageElement>(null);
  const source = useSourceValue();
  const [blockSize, setBlockSize] = useState(1);
  const [pixelateSrc, setPixelateSrc] = useState("");
  const [maxBlockSize, setMaxBlockSize] = useState(MIN_MAX_BLOCK_SIZE);

  const onBlockSizeChange = useCallback(
    (v: number) => {
      if (!origImgRef.current) return;
      const img = origImgRef.current;
      const imgUtil = ImageUtil.instance;
      const data = imgUtil.getImageDataFromElement(img);
      imgUtil.pixelate(data, v);
      setBlockSize(v);
      setPixelateSrc(imgUtil.getSrcFromImageData(data));
    },
    [origImgRef, setBlockSize, setPixelateSrc]
  );

  const handleMaxBlockSize = useCallback(() => {
    if (!origImgRef.current) return setMaxBlockSize(MIN_MAX_BLOCK_SIZE);
    const dim = Math.min(origImgRef.current.width, origImgRef.current.height);
    const res = Math.floor(dim / MIN_RES_DIM);
    setMaxBlockSize(res < MIN_MAX_BLOCK_SIZE ? MIN_MAX_BLOCK_SIZE : res);
  }, [origImgRef, setMaxBlockSize]);

  useLayoutEffect(() => {
    addEventListener("resize", handleMaxBlockSize);
    return () => removeEventListener("resize", handleMaxBlockSize);
  }, []);

  return (
    <div>
      <div className="shadow-lg rounded-2xl p-4 border-red-200 border-4 mx-2 my-4 w-80 md:w-128 sm:w-96">
        <img
          className="w-full h-full"
          ref={origImgRef}
          src={source}
          style={{
            display: blockSize !== 1 ? "none" : "block",
          }}
          onLoad={handleMaxBlockSize}
        />
        {blockSize > 1 && (
          <img
            className="w-full h-full"
            style={{ display: "block" }}
            src={pixelateSrc}
          />
        )}
      </div>

      <div className="flex flex-col mt-4 mb-8">
        <div className="flex flex-row items-end my-2">
          <span className="md:text-2xl text-xl mr-1 font-semibold tracking-tight md:tracking-tighter leading-tight">
            Block Size:
          </span>
          <NumberInput
            value={blockSize}
            onChange={onBlockSizeChange}
            max={maxBlockSize}
          />
        </div>
        <Slider
          value={blockSize}
          onChange={onBlockSizeChange}
          max={maxBlockSize}
        />
      </div>

      <div className="mt-6">
        <NewUploadButton />
      </div>
    </div>
  );
};
