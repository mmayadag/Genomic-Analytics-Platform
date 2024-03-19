import GeneStats from "@/components/stats/gene-stats";
import { GeneSelectFilter } from "../components/gene-select";
import GeneAnalyticsTable from "@/components/table/gene-analytics-table";
import GeneChart from "@/components/stats/gene-chart";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 pt-24">
      <GeneSelectFilter title="Select Genes" />
      <GeneAnalyticsTable />
      <GeneStats />
      <GeneChart />
    </main>
  );
}
