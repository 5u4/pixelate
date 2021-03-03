import React from "react";
import { useSourceState } from "../store/source";

export const NewUploadButton: React.FC = () => {
  const [, setSource] = useSourceState();

  // https://www.tailwind-kit.com/components/buttons
  return (
    <button
      type="button"
      className="py-2 px-4 bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      onClick={() => setSource(undefined)}
    >
      Upload New Image
    </button>
  );
};
