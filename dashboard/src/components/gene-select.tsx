"use client"

import { useEffect, useCallback, SetStateAction } from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSearchInput,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { getAllGenes } from "@/services/gene.service"
import { useAtom } from 'jotai';
import { geneSearchParamAtom, geneSelectListOptionsAtom, geneSelectedOptionsAtom } from '@/store/gene-store';
import { GeneDataOption } from "@/types/gene"

interface DataTableFacetedFilterProps<TData, TValue> {
  title?: string
}

export function GeneSelectFilter<TData, TValue>({
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [options, setOptions] = useAtom(geneSelectListOptionsAtom);
  const [selectedGenes, setSelectedGenes] = useAtom(geneSelectedOptionsAtom)

  const [searchParam, setSearchParam] = useAtom(geneSearchParamAtom);

  useEffect(function fetchGeneOptions() {
    async function fetchData() {
      const data = await getAllGenes(searchParam);
      setOptions(data)
    }
    fetchData();
  }, [searchParam, setOptions])

  const handleSelection = useCallback((option: GeneDataOption) => {
    const newSelectedValues: GeneDataOption[] = [...selectedGenes];
    const isSelected = newSelectedValues.some((item: GeneDataOption) => item._id === option._id)
    if (isSelected) {
      const index = newSelectedValues.findIndex(item => item._id === option._id)
      newSelectedValues.splice(index, 1)
    } else {
      newSelectedValues.push(option)
    }
    setSelectedGenes(newSelectedValues)
  }, [selectedGenes, setSelectedGenes])

  const clearSelection = useCallback(() => {
    setSelectedGenes([])
  }, [setSelectedGenes])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </PopoverTrigger>
      <div>
        {selectedGenes?.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 h-4 mr-2" />
            <div className="space-x-1 lg:flex">
              {
                selectedGenes?.map((option) => (
                  <Badge
                    variant="secondary"
                    key={option._id}
                    className="rounded-sm px-1 font-normal"
                    onClick={() => {
                      handleSelection(option)
                    }}
                  >
                    {option.gene}
                  </Badge>
                ))
              }
            </div>
          </>
        )}
      </div>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandSearchInput placeholder={title} onChange={(e: { target: { value: SetStateAction<string> } }) => {
            setSearchParam(e.target.value)
          }} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option, index) => {
                const isSelected = selectedGenes.some(item => item._id === option._id)
                return (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      handleSelection(option)
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.gene}</span>

                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedGenes.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearSelection}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
