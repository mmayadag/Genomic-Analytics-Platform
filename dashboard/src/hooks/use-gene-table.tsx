import { getAllGenesResults, getGeneStats } from "@/services/gene.service";
import {
  geneAnalyticsTableResultAtom,
  geneAnalyticsTableResultsIsLoadingAtom,
  geneAnalyzeSelectionAtom,
  geneSelectedOptionsAtom,
  geneStatsAtom,
} from "@/store/gene-store";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { GeneDataList, GeneStats } from "@/types/gene";

const useGeneTable = () => {
  const { toast } = useToast();

  const [geneAnalyzeSelection, setGeneAnalyzeSelection] = useAtom(
    geneAnalyzeSelectionAtom,
  );
  const [, setGeneStatsAtom] = useAtom(geneStatsAtom);

  const [selectedGenes] = useAtom(geneSelectedOptionsAtom);

  const [geneAnalyticsTableData, setGeneAnalyticsTableData] = useAtom(
    geneAnalyticsTableResultAtom,
  );

  const [isLoading, setIsLoading] = useAtom(
    geneAnalyticsTableResultsIsLoadingAtom,
  );

  useEffect(
    function fetchGeneOptions() {
      async function fetchData() {
        setIsLoading(true);
        try {
          const data: GeneDataList = await getAllGenesResults(selectedGenes);

          const orderData: GeneDataList = [];
          selectedGenes.forEach((gene) => {
            const found = data.find((d) => d.gene === gene.gene);
            if (found) {
              orderData.push(found);
            }
          });
          setGeneAnalyticsTableData(orderData);
        } catch (e) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "There was a problem while getting gene analytic table.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }
      if (selectedGenes.length > 0) {
        fetchData();
      }
    },
    [selectedGenes, setGeneAnalyticsTableData, setIsLoading, toast],
  );

  useEffect(
    function fetchGeneStats() {
      async function fetchData() {
        try {
          const data: GeneStats = await getGeneStats(
            geneAnalyzeSelection?.gene ?? "",
          );
          setGeneStatsAtom(data);
        } catch (e) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem while getting gene stats.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          console.error(e);
        }
      }
      if (geneAnalyzeSelection && geneAnalyzeSelection.gene) {
        fetchData();
      }
    },
    [geneAnalyzeSelection, setGeneStatsAtom, toast],
  );

  const analyzeHandler = useCallback(
    (row: any) => {
      setGeneAnalyzeSelection(row.original);
      const element = document.querySelector("#analyzeSection");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    },
    [setGeneAnalyzeSelection],
  );

  return {
    geneAnalyticsTableData,
    isLoading,
    selectedGenes,
    analyzeHandler,
  };
};

export default useGeneTable;
