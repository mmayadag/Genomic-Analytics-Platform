"use client";

import { FC } from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { GeneBadgeList, GeneSelectButton } from "@/components/gene-select";
import useGeneFilter from "@/hooks/use-gene-filter";
import GeneOptionsListContent from "./gene-option-list-content";

type DataTableFacetedFilterProps = {
  title?: string;
};
const GeneSelectFilter: FC<DataTableFacetedFilterProps> = ({ title }) => {
  const { handleSelection } = useGeneFilter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <GeneSelectButton title={title} />
        </div>
      </PopoverTrigger>
      <GeneBadgeList handleSelection={handleSelection} />
      <GeneOptionsListContent title={title} handleSelection={handleSelection} />
    </Popover>
  );
};

export default GeneSelectFilter;
