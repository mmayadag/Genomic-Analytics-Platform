"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { Button } from "@/components/ui/button"
import { getGeneStats } from "@/services/gene.service"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gene",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gene" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("gene")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "exper_rep1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="exper_rep1" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{parseFloat(row.getValue("exper_rep1")).toFixed(2)}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "exper_rep2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="exper_rep2" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("exper_rep2")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "exper_rep3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="exper_rep3" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("exper_rep3")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "control_rep1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Control Rep 1" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("control_rep1")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "control_rep2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Control Rep 2" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("control_rep2")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "control_rep3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Control Rep 3" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("control_rep3")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "dataSet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Set" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("dataSet")}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "transcript",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transcript" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("transcript")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "analyze",
    cell: ({ row }) => <Button onClick={async () => {
      const gene: string = row.getValue("gene");
      const geneStats = await getGeneStats(gene);
    }}>Analyze</Button>,
  },
]

export const columnsWithAnalysis: (analyzeHandler: (row: any) => void) => ColumnDef<Task>[] = (analyzeHandler) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "gene",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gene" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("gene")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "exper_rep1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="exper_rep1" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{parseFloat(row.getValue("exper_rep1")).toFixed(2)}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "exper_rep2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="exper_rep2" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("exper_rep2")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "exper_rep3",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="exper_rep3" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("exper_rep3")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "control_rep1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Control Rep 1" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("control_rep1")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "control_rep2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Control Rep 2" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("control_rep2")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "control_rep3",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Control Rep 3" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("control_rep3")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "dataSet",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data Set" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("dataSet")}</div>,
      enableSorting: true,
      enableHiding: true,
    },

    {
      accessorKey: "transcript",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transcript" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("transcript")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "analyze",
      cell: ({ row }) => <Button onClick={() => {
        analyzeHandler(row);
      }}>Analyze</Button>,
    },
  ]
}