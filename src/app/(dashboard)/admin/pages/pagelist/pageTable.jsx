"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  SquarePen,
  ChevronDown,
  AlignJustify,
  X,
  Filter,
  Search,
  Trash2,
  Eye,
  Copy
} from "lucide-react";
import { FaRegEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDataFromBackend } from "@/lib/features/formSlice";
import { useSelector, useDispatch } from "react-redux";
import { deletePages } from "@/lib/features/formSlice";


const columns = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "PageTitle",
    header: "PageTitle",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("PageTitle")}</div>
    ),
  },
  {
    accessorKey: "Url",
    header: () => <div className="">Url</div>,
    cell: ({ row }) => (
      <section className="flex">
        <div className="flex justify-center items-center gap-1 lowercase">
          {row.getValue("Url")}
          <Link href={`${row.getValue("Url")}`}><FaRegEye width={20} height={20} /></Link>
        </div>
      </section>
    ),
  },
  {
    accessorKey: "active",
    header: () => <div className="text-right">In Sitemap</div>,
    cell: ({ row }) => {
      if (row.getValue("active") === "true") {
        return <div className="text-right font-medium">Yes</div>;
      }
      return <div className="text-right font-medium">No</div>;
    },
  },
  {
    accessorKey: "CreatedAt",
    header: () => <div className="text-center">Crated At</div>,
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("CreatedAt")}</div>
    ),
  },
  {
    accessorKey: "action",
    enableHiding: false,
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      const pageId = row.getValue("action");

      return (
        <div>
          {row.getValue("action")}
          <Link href={`${row.getValue("action")}/edit`}><SquarePen /></Link>
        </div>
      );
    },
  },
];

function DataTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.data);
  const status = useSelector((state) => state.form.status);
  const error = useSelector((state) => state.form.error);

  const [sorting, setSorting] = React.useState([]); // handle sorting states
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getDataFromBackend());
  }, [dispatch]);


  useEffect(() => {
    if (status === 'succeeded' && data?.pages?.length > 0) {
      const PageData = data.pages.map((dta) => ({
        id: dta.id,
        active: dta.show_in_root_sitemap,
        PageTitle: dta.title,
        Url: dta.url,
        CreatedAt: dta.created_at,
        action: dta.id
      }));
      setTableData(PageData);
    }
  }, [status, data]);

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting, //sorting state function
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters, //Filter Column state function
    getFilteredRowModel: getFilteredRowModel(), // this config enables filtering

    getCoreRowModel: getCoreRowModel(), // this config enables mapping rows values

    getPaginationRowModel: getPaginationRowModel(),

    onColumnVisibilityChange: setColumnVisibility, // visibility column state function
    onRowSelectionChange: setRowSelection, // selecting Rows state function
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  //   console.log(table.getHeaderGroups());
  //   console.log(table.getRowModel().rows.length);
  //   console.log(table.getFilteredSelectedRowModel());

  const handleDelete = () => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);

    if (selectedIds.length === 0) {
      alert("No rows selected for deletion.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} pages?`)) {
      return;
    }

    console.log("Deleting pages with IDs:", selectedIds);

    dispatch(deletePages(selectedIds))
      .unwrap()
      .then(() => {
        alert("Selected pages deleted successfully!");
        dispatch(getDataFromBackend());
        // Optionally, refresh the table data here
      })
      .catch((error) => {
        console.error("Error deleting pages:", error);
        alert("Failed to delete pages.");
      });
  };



  return (
    <div className="w-full mt-5 mb-5 bg-white">
      <div className="flex justify-between items-center p-4 relative">
        <div className="flex justify-center items-center gap-1">
          <Trash2
            onClick={handleDelete}
          />
          <p>({table.getFilteredSelectedRowModel().rows.length})</p>
        </div>
        <div className="w-[25%] h-98 flex relative">
          <span className="absolute -top-3 left-3 bg-white px-1 z-10">
            Search By
          </span>
          <Input
            placeholder="Filter Title..."
            value={table.getColumn("PageTitle")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("PageTitle")?.setFilterValue(event.target.value)
            }
            className="rounded-none"
          />
          <div className="flex justify-center items-center absolute right-0">
            <X
              size={20}
              onClick={() => table.getColumn("PageTitle")?.setFilterValue("")}
            />
            <Button variant="Secondary">
              <Filter />
            </Button>
            <Button className="rounded-none">
              <Search />
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader className="border-t">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="first:hover:bg-transparent first:bg-slate-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
          {" "}
          <select
            className="ring-1 ring-black rounded-sm"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 15, 20, 40].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <span>{table.getState().pagination.pageIndex + 1}</span>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
