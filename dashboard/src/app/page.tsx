import {
  GeneSelectFilter,
  GeneAnalyticsTable,
  GeneChart,
  GeneStats,
} from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 pt-24">
      <GeneSelectFilter title="Select Genes" />
      <GeneAnalyticsTable />
      <GeneStats />
      <GeneChart />
    </div>
  );
}
