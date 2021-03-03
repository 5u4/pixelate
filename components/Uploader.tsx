import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSourceState } from "../store/source";

export const Uploader: React.FC = () => {
  const toast = useToast();
  const [, setSource] = useSourceState();

  return (
    <div className="relative m-12 border-dashed border-red-500 border-4 rounded-lg">
      <div className="absolute w-full h-full flex justify-center items-center py-10 px-4">
        <span className="text-lg font-semibold text-center">
          Click or Drop image to this area
        </span>
      </div>
      <input
        className="opacity-0 md:w-72 sm:w-52 w-48 md:h-72 sm:h-52 h-48"
        type="file"
        multiple={false}
        accept="image/x-png,image/jpeg"
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length !== 1) return setSource(undefined);

          if (!files[0].type.startsWith("image/")) {
            toast({
              title: "File Type Error",
              description: "Please upload image only",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return setSource(undefined);
          }

          setSource(URL.createObjectURL(files[0]));
        }}
      />
    </div>
  );
};
