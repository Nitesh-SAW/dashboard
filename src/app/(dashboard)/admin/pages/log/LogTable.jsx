"use client"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/combo-box"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectInput
} from "@/components/ui/select";
import {
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: 1,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 2,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "no",
  },
  {
    id: 4,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 5,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 6,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 7,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 8,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 9,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
  {
    id: 10,
    name: "The simplest and fastest way",
    createdAt: "2021-01-01, 1:59",
    restore: "yes",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: "Page logs",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    meta: { align: "center" },
  },
  {
    accessorKey: "createdAt",
    header: "",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("createdAt")}</div>
    ),
  },
  {
    accessorKey: "restore",
    header: "",
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("restore")}</div>
    ),
  },
];

const LogTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });



  return (
    <section className="w-full p-1 bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headersgroup) => (
            <TableRow key={headersgroup.id}>
              {headersgroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell, index) => {
                let cellClass = "p-2";
                if (index === 1 || index === 2) {
                  cellClass += " text-right";
                }
                return (
                  <TableCell key={cell.id} className={cellClass}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section >
  );
};

export default LogTable;
