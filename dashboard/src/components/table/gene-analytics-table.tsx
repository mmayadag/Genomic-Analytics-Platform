"use client"
import { useMemo } from "react";
import { columnsWithAnalysis } from "./components/columns"
import { DataTable } from "./components/data-table"
import useGeneTable from "@/hooks/use-gene-table"
import { GeneDataTableType } from "@/types/gene";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

export default function GeneAnalyticsTable() {

  const { selectedGenes, geneAnalyticsTableData, isLoading, analyzeHandler } = useGeneTable();
  const columns = useMemo(() => columnsWithAnalysis(analyzeHandler), [analyzeHandler]);

  if (selectedGenes.length === 0) {
    return <></>
  }

  return (
    <>
      <div className="container relative">
        <section>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
            <div className="md:hidden flex">
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(geneAnalyticsTableData as GeneDataTableType)?.map((item) => (
                  <Card key={item._id} className="p-4 shadow-md flex items-center justify-center">
                    <div>
                      <CardHeader>Gene: <strong>{item.gene}</strong></CardHeader>
                      <CardDescription>
                        Dataset: {item.dataSet}
                      </CardDescription>
                    </div>
                    <CardContent>
                      <div>Control Rep1: {item.control_rep1}</div>
                      <div>Control Rep2: {item.control_rep2}</div>
                      <div>Control Rep3: {item.control_rep3}</div>
                      <div>Exper Rep1: {item.exper_rep1}</div>
                      <div>Exper Rep2: {item.exper_rep2}</div>
                      <div>Exper Rep3: {item.exper_rep3}</div>
                      <div>Transcript: {item.transcript}</div>
                      <div>Dataset: {item.dataSet}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button onClick={() => analyzeHandler({ original: item })}>Analyze</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <DataTable data={geneAnalyticsTableData as GeneDataTableType} columns={columns} isLoading={isLoading} />
            </div>
          </div>
        </section >
      </div >
    </>
  )
}