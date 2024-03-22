"use client";

import { useEffect, useCallback } from "react";
import { getAllGenes } from "@/services/gene.service";
import { useAtom } from "jotai";
import {
  geneAnalyzeSelectionAtom,
  geneSearchParamAtom,
  geneSelectListOptionsAtom,
  geneSelectedOptionsAtom,
  geneStatsAtom,
} from "@/store/gene-store";
import { GeneDataList, GeneDataOption } from "@/types/gene";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "@uidotdev/usehooks";

const useGeneFilter = () => {
  const { toast } = useToast();

  const [options, setOptions] = useAtom(geneSelectListOptionsAtom);
  const [selectedGenes, setSelectedGenes] = useAtom(geneSelectedOptionsAtom);

  const [searchParam, setSearchParam] = useAtom(geneSearchParamAtom);
  const [, setGeneStats] = useAtom(geneStatsAtom);
  const [, setGeneAnalyzeSelection] = useAtom(geneAnalyzeSelectionAtom);

  const debouncedSearchTerm = useDebounce(searchParam, 300);

  useEffect(
    function fetchGeneOptions() {
      async function fetchData() {
        try {
          const data: GeneDataList = await getAllGenes(debouncedSearchTerm);
          setOptions(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem while gettin gene data list.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          console.error("Error fetching gene options:", error);
        }
      }
      fetchData();
    },
    [debouncedSearchTerm, setOptions, toast],
  );

  const clearGeneStats = useCallback(() => {
    setGeneStats(null);
    setGeneAnalyzeSelection(null);
  }, [setGeneAnalyzeSelection, setGeneStats]);

  const handleSelection = useCallback(
    (option: GeneDataOption) => {
      const newSelectedValues: GeneDataOption[] = [...selectedGenes];
      const isSelected = newSelectedValues.some(
        (item: GeneDataOption) => item._id === option._id,
      );
      if (isSelected) {
        const index = newSelectedValues.findIndex(
          (item) => item._id === option._id,
        );
        newSelectedValues.splice(index, 1);
        clearGeneStats();
      } else {
        newSelectedValues.push(option);
      }
      setSelectedGenes(newSelectedValues);
    },
    [selectedGenes, setSelectedGenes, clearGeneStats],
  );

  return {
    options,
    selectedGenes,
    handleSelection,
    setSearchParam,
  };
};

export default useGeneFilter;
