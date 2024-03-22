import React, { FC, SetStateAction } from "react";
import { CommandSearchInput } from "@/components/ui/command";
import { useAtom } from "jotai";
import { geneSearchParamAtom } from "@/store/gene-store";

type GeneSearchInputProps = {
  placeholder?: string;
  setSearchParam: (value: SetStateAction<string>) => void;
};

const GeneSearchInput: FC<GeneSearchInputProps> = ({ placeholder }) => {
  const [searchParam, setSearchParam] = useAtom(geneSearchParamAtom);

  return (
    <CommandSearchInput
      placeholder={placeholder}
      value={searchParam}
      onChange={(e: { target: { value: SetStateAction<string> } }) => {
        setSearchParam(e.target.value);
      }}
    />
  );
};
export default GeneSearchInput;
