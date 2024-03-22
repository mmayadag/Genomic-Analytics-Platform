import { FC } from "react";
import { cn } from "@/lib/utils";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { CheckIcon } from "@radix-ui/react-icons";
import { GeneDataList, GeneDataOption } from "@/types/gene";

type GenePopupOptionListProps = {
  options: GeneDataOption[];
  selectedGenes: GeneDataList;
  handleSelection: (option: GeneDataOption) => void;
};

const GenePopupOptionList: FC<GenePopupOptionListProps> = ({
  options,
  selectedGenes,
  handleSelection,
}) => (
  <CommandGroup>
    {options?.map((option, index) => {
      const isSelected = selectedGenes.some((item) => item._id === option._id);
      return (
        <CommandItem
          key={index}
          onSelect={() => {
            handleSelection(option);
          }}
        >
          <div
            className={cn(
              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "opacity-50 [&_svg]:invisible",
            )}
          >
            <CheckIcon className={cn("h-4 w-4")} />
          </div>
          {option.icon && (
            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{option.gene}</span>
        </CommandItem>
      );
    })}
  </CommandGroup>
);

export default GenePopupOptionList;
