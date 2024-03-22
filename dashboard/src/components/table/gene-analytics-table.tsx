"use client";
import { useMemo } from "react";
import { columnsWithAnalysis } from "./components/columns";
import { DataTable } from "./components/data-table";
import useGeneTable from "@/hooks/use-gene-table";
import { GeneDataTableType } from "@/types/gene";
import MobileDataCard from "./components/mobile-data-card";

export default function GeneAnalyticsTable() {
  const { selectedGenes, geneAnalyticsTableData, isLoading, analyzeHandler } =
    useGeneTable();
  const columns = useMemo(
    () => columnsWithAnalysis(analyzeHandler),
    [analyzeHandler],
  );

  if (selectedGenes.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="container relative">
        <section>
          <div className="overflow-hidden rounded-[0.5rem] md:border md:bg-background md:shadow-md md:shadow-xl">
            <MobileDataCard
              geneAnalyticsTableData={
                geneAnalyticsTableData as GeneDataTableType
              }
              analyzeHandler={analyzeHandler}
            />
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <DataTable
                data={geneAnalyticsTableData as GeneDataTableType}
                columns={columns}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
