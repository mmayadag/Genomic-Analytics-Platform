import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons";
import { Column, SortDirection } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { useCallback, useMemo } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

type SortTypes = false | SortDirection;
type IconType = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;
type SortMenuItemProps = { sortType: SortTypes; Icon: IconType; label: string };

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const getSortIcon = (columnSort: SortTypes) => {
    switch (columnSort) {
      case "desc":
        return <ArrowDownIcon className="h-4 w-4" />;
      case "asc":
        return <ArrowUpIcon className="h-4 w-4" />;
      default:
        return <CaretSortIcon className="h-4 w-4" />;
    }
  };
  const getColumnSort = useCallback(
    (isSorted: SortTypes): SortTypes =>
      isSorted === "desc" ? "desc" : isSorted === "asc" ? "asc" : false,
    [],
  );

  const columnSort = getColumnSort(column.getIsSorted());

  const SortMenuItem = useCallback(
    ({ sortType, Icon, label }: SortMenuItemProps) => (
      <DropdownMenuItem
        onClick={() =>
          sortType === false
            ? column.clearSorting()
            : column.toggleSorting(sortType === "desc")
        }
      >
        <Icon
          className={cn(
            `mr-2 h-3.5 w-3.5 ${columnSort === sortType ? "text-muted-foreground" : "text-muted-foreground/70"}`,
          )}
        />
        <span className={columnSort === sortType ? "font-bold" : ""}>
          {label}
        </span>
      </DropdownMenuItem>
    ),
    [column, columnSort],
  );

  const handleSortIconClick = useCallback(() => {
    if (columnSort === false) {
      column.toggleSorting(false);
    } else if (columnSort === "asc") {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  }, [column, columnSort]);

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            {title}
          </Button>
        </DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="m-0 -ml-1 px-2 h-8 data-[state=open]:bg-accent"
          onClick={handleSortIconClick}
        >
          {getSortIcon(columnSort)}
        </Button>
        <DropdownMenuContent align="start">
          <SortMenuItem sortType="asc" Icon={ArrowUpIcon} label="Asc" />
          <SortMenuItem sortType="desc" Icon={ArrowDownIcon} label="Desc" />
          <SortMenuItem sortType={false} Icon={ValueNoneIcon} label="Reset" />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
