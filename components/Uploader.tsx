import React from "react";
import { useSourceState } from "../store/source";

export const Uploader: React.FC = () => {
  const [, setSource] = useSourceState();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          setSource(
            !files || !files.length ? undefined : URL.createObjectURL(files[0])
          );
        }}
      />
    </div>
  );
};
