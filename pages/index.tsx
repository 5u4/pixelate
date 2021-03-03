import React from "react";
import { Pixelater } from "../components/Pixelater";
import { Title } from "../components/Title";
import { Uploader } from "../components/Uploader";
import { useSourceValue } from "../store/source";

export const index: React.FC = () => {
  const source = useSourceValue();

  return (
    <div className="container flex flex-col items-center mx-auto mb-24">
      <Title />
      {source === undefined ? <Uploader /> : <Pixelater />}
    </div>
  );
};

export default index;
