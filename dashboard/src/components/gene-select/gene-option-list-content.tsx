import { FC } from "react";
import { GeneDataOption } from "@/types/gene";
import { Command, CommandList } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import {
  GenePopupOptionList,
  GeneSelectClear,
  GeneSearchInput,
  GeneOptionsListEmpty,
} from "@/components/gene-select";
import { useAtom } from "jotai";
import {
  geneSearchParamAtom,
  geneSelectListOptionsAtom,
  geneSelectedOptionsAtom,
} from "@/store/gene-store";

type GeneOptionsListContentProps = {
  title?: string;
  handleSelection: (option: GeneDataOption) => void;
};

const GeneOptionsListContent: FC<GeneOptionsListContentProps> = ({
  title,
  handleSelection,
}) => {
  const [, setSearchParam] = useAtom(geneSearchParamAtom);
  const [selectedGenes] = useAtom(geneSelectedOptionsAtom);
  const [options] = useAtom(geneSelectListOptionsAtom);

  return (
    <PopoverContent className="w-[200px] p-0" align="start">
      <Command>
        <GeneSearchInput placeholder={title} setSearchParam={setSearchParam} />
        <CommandList>
          <GeneOptionsListEmpty options={options} />
          <GenePopupOptionList
            options={options}
            selectedGenes={selectedGenes}
            handleSelection={handleSelection}
          />
          <GeneSelectClear />
        </CommandList>
      </Command>
    </PopoverContent>
  );
};

export default GeneOptionsListContent;
