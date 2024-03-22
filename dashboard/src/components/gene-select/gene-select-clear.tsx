import { FC, useCallback } from "react";
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { useAtom } from "jotai";
import {
  geneAnalyzeSelectionAtom,
  geneSearchParamAtom,
  geneSelectedOptionsAtom,
  geneStatsAtom,
} from "@/store/gene-store";

type GeneSelectClearProps = {};

const GeneSelectClear: FC<GeneSelectClearProps> = () => {
  const [, setSelectedGenes] = useAtom(geneSelectedOptionsAtom);
  const [, setSearchParam] = useAtom(geneSearchParamAtom);
  const [, setGeneAnalyzeSelection] = useAtom(geneAnalyzeSelectionAtom);
  const [, setGeneStats] = useAtom(geneStatsAtom);
  const clearSelection = useCallback(() => {
    setSelectedGenes([]);
    setSearchParam("");
    setGeneAnalyzeSelection(null);
    setGeneStats(null);
  }, [setGeneAnalyzeSelection, setGeneStats, setSearchParam, setSelectedGenes]);

  return (
    <>
      <>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem
            onSelect={clearSelection}
            className="justify-center text-center"
          >
            Clear filters
          </CommandItem>
        </CommandGroup>
      </>
    </>
  );
};

export default GeneSelectClear;
