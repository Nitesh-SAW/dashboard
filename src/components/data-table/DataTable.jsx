"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SquarePen,
  ChevronDown,
  AlignJustify,
  X,
  Filter,
  Search,
  Trash2,
  Eye,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import FooterData from "./TableFooter";

const DataTable = ({ data, columns, handleDelete }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [activeRows, setActiveRows] = useState({});
  const [filterColumn, setFilterColumn] = useState(""); // 🔍 Column filters state
  const [filterValue, setFilterValue] = useState(""); // Filter input value
  const [showFilter, setShowFilter] = useState(false); // Toggle filter UI

  const toggleActive = (rowId) => {
    setActiveRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,

    state: {
      rowSelection,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  // Apply filter when the filter input changes
  const handleFilterChange = (value) => {
    setFilterValue(value);
    if (filterColumn) {
      table.getColumn(filterColumn)?.setFilterValue(value);
    }
  };

  // Reset filter
  const clearFilter = () => {
    setFilterColumn("");
    setFilterValue("");
    table.resetColumnFilters();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <Trash2
            className="cursor-pointer"
            onClick={() => { handleDelete(table.getSelectedRowModel().rows.map(row => row.original.id)) }}
          />
          <p>({table.getFilteredSelectedRowModel().rows.length})</p>
        </div>

        <div className="relative w-[25%] flex flex-col gap-2">
          {/* Label */}
          <span className="absolute -top-3 left-3 bg-white px-1 z-10 text-sm font-medium">
            Search By
          </span>

          {/* Input Field (Visible only when a column is selected) */}
          {filterColumn && (
            <Input
              placeholder={`Search in ${filterColumn}...`}
              value={filterValue}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border p-2 rounded-md text-sm w-full"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-center items-center absolute right-0">
            {filterColumn && (
              <X
                size={20}
                onClick={() => {
                  clearFilter();
                  setShowFilter(true); // Show filter dropdown when clearing
                }}
                className="cursor-pointer text-gray-500 hover:text-black"
              />
            )}
            <Button
              variant="Secondary"
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-1 px-3 py-1"
            >
              <Filter size={16} />
            </Button>
            {showFilter && (
              <select
                className="absolute border p-2 w-full rounded-md text-sm bg-white top-10 right-14 z-50"
                value={filterColumn}
                onChange={(e) => {
                  setFilterColumn(e.target.value);
                  setShowFilter(false); // Hide dropdown after selecting
                }}
              >
                {columns
                  .filter(col => col.accessorKey) // Only filterable columns
                  .map(col => (
                    <option key={col.accessorKey} value={col.accessorKey}>
                      {col.header}
                    </option>
                  ))}
              </select>
            )}

            {/* <Button className="rounded-md px-3 py-1">
              <Search size={16} />
            </Button> */}
          </div>
        </div>

      </div>
      <div className="mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-[34px] font-normal uppercase text-xs text-gray-500"
                  >
                    {flexRender(
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, {
                      ...cell.getContext(),
                      activeRows,
                      toggleActive,
                    })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FooterData table={table} />
    </div>
  );
};

export default DataTable;