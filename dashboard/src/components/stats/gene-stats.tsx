"use client";

import { FC, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAtom } from "jotai";
import { geneStatsAtom } from "@/store/gene-store";
import { formatValue } from "@/lib/number-formatter";

const GeneStats: FC = () => {
  const [geneStatsData] = useAtom(geneStatsAtom);
  const geneStatCards = useMemo(() => {
    if (!geneStatsData) return [];

    return [
      {
        title: "Gene Name",
        value: geneStatsData.gene,
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        ),
      },
      {
        title: "Mean",
        value: geneStatsData.mean,
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
      },
      {
        title: "Median",
        value: geneStatsData.median,
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
      },
      {
        title: "Variance",
        value: geneStatsData.variance,
        extra: "+20.1%",
        icon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
      },
    ];
  }, [geneStatsData]);

  return (
    <>
      <div
        className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"
        id="analyzeSection"
      >
        {geneStatCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon && <card.icon />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof card.value === "number"
                  ? formatValue(card.value)
                  : card.value}
              </div>
              {card.extra && (
                <p className="text-xs text-muted-foreground">{card.extra}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default GeneStats;
