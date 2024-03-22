import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { GeneDataOption } from "@/types/gene";

type GeneBadgeProps = {
  option: GeneDataOption;
  handleSelection: (option: { _id: string; gene: string }) => void;
};

const GeneBadge: FC<GeneBadgeProps> = ({
  option: { gene, _id },
  handleSelection,
}) => (
  <Badge
    variant="secondary"
    key={_id}
    className="rounded-sm font-normal cursor-not-allowed sm:space-x-2 space-y-2 px-4 py-2 select-none"
    onClick={() => {
      handleSelection({ _id, gene });
    }}
  >
    {gene}
  </Badge>
);

export default GeneBadge;
