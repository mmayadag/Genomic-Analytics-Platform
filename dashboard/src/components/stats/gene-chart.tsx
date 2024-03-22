"use client";

import { FC, useMemo } from "react";
import HorizontalStackedBar from "@/components/ui/horizontal-bar-chart";
import { useAtom } from "jotai";
import { geneAnalyzeSelectionAtom } from "@/store/gene-store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const GeneChart: FC = () => {
  const [geneAnalyze] = useAtom(geneAnalyzeSelectionAtom);

  const data = useMemo(
    () =>
      geneAnalyze
        ? [
            {
              name: "1",
              experience: geneAnalyze.exper_rep1,
              control: geneAnalyze.control_rep1,
            },
            {
              name: "2",
              experience: geneAnalyze.exper_rep2,
              control: geneAnalyze.control_rep2,
            },
            {
              name: "3",
              experience: geneAnalyze.exper_rep3,
              control: geneAnalyze.control_rep3,
            },
          ]
        : [],
    [geneAnalyze],
  );

  if (!geneAnalyze) return <></>;

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center lg:grid-cols-7 md:grid-cols-2">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <HorizontalStackedBar data={data} />
          </CardContent>
        </Card>
        {/*
          TODO: show heatmap
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Gene Expressions Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <MyResponsiveHeatMap data={data2} />
          </CardContent>
        </Card>
         */}
      </div>
    </>
  );
};

export default GeneChart;
