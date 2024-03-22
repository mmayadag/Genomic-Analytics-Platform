import { FC } from "react";
import { GeneDataList } from "@/types/gene";
import { CommandEmpty } from "../ui/command";
import { GeneSelectClear } from ".";

type GeneOptionsListEmptyProps = {
  options: GeneDataList;
};

const GeneOptionsListEmpty: FC<GeneOptionsListEmptyProps> = ({ options }) => {
  return (
    <>
      <CommandEmpty>No results found.</CommandEmpty>
    </>
  );
};

export default GeneOptionsListEmpty;
