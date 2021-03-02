import { atom, useRecoilState, useRecoilValue } from "recoil";

const sourceState = atom<string | undefined>({
  key: "SOURCE",
  default: undefined,
});

export const useSourceValue = () => useRecoilValue(sourceState);
export const useSourceState = () => useRecoilState(sourceState);
