import { FC } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

type GeneSelectButtonProps = {
  title?: string;
};

const GeneSelectButton: FC<GeneSelectButtonProps> = ({ title }) => (
  <Button variant="default" size="lg" className="h-9 w-[200px] border-dashed">
    <PlusCircledIcon className="mr-2 h-4 w-4" />
    {title}
  </Button>
);

export default GeneSelectButton;
