import { FC } from "react";
import GeneBadge from "./gene-badge";
import { GeneDataOption } from "@/types/gene";
import { useAtom } from "jotai";
import { geneSelectedOptionsAtom } from "@/store/gene-store";

type GeneBadgeListProps = {
  handleSelection: (gene: GeneDataOption) => void;
};

const GeneBadgeList: FC<GeneBadgeListProps> = ({ handleSelection }) => {
  const [selectedGenes] = useAtom(geneSelectedOptionsAtom);

  return (
    <div className="container">
      {selectedGenes?.length > 0 && (
        <div className="gap-2 flex flex-wrap sm:justify-center">
          {selectedGenes?.map((option) => (
            <GeneBadge
              key={option._id}
              option={option}
              handleSelection={handleSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneBadgeList;
