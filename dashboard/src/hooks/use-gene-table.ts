import { getAllGenesResults, getGeneStats } from '@/services/gene.service';
import { geneAnalyticsTableResultAtom, geneAnalyticsTableResultsIsLoadingAtom, geneAnalyzeSelectionAtom, geneSelectedOptionsAtom, geneStatsAtom } from '@/store/gene-store';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

const useGeneTable = () => {

  const [geneAnalyzeSelection, setGeneAnalyzeSelection] = useAtom(geneAnalyzeSelectionAtom)
  const [geneStats, setGeneStatsAtom] = useAtom(geneStatsAtom)

  const [selectedGenes] = useAtom(geneSelectedOptionsAtom)

  const [geneAnalyticsTableData, setGeneAnalyticsTableData] = useAtom(geneAnalyticsTableResultAtom)

  const [isLoading, setIsLoading] = useAtom(geneAnalyticsTableResultsIsLoadingAtom)

  useEffect(
    function fetchGeneOptions() {
      async function fetchData() {
        setIsLoading(true)
        try {
          const data = await getAllGenesResults(selectedGenes);
          setGeneAnalyticsTableData(data)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }
      }
      if (selectedGenes.length > 0) {
        fetchData();
      }
    }, [selectedGenes, setGeneAnalyticsTableData, setIsLoading])

  useEffect(
    function fetchGeneStats() {
      async function fetchData() {
        try {
          const data = await getGeneStats(geneAnalyzeSelection?.gene ?? "");
          setGeneStatsAtom(data)
        } catch (e) {
          console.error(e)
        }
      }
      if (geneAnalyzeSelection && geneAnalyzeSelection.gene) {
        fetchData();
      }

    }, [geneAnalyzeSelection, geneStats, setGeneStatsAtom]);

  const analyzeHandler = useCallback((row: any) => {
    setGeneAnalyzeSelection(row.original)
  }, [setGeneAnalyzeSelection])

  return {
    geneAnalyticsTableData,
    isLoading,
    selectedGenes,
    analyzeHandler
  }
};

export default useGeneTable;