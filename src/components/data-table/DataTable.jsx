"use client";
import React, { useState } from "react";
import { Input } from '@/components/ui/input'
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
} from "@tanstack/react-table";

import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import FooterData from "./TableFooter";

const DataTable = ({ data, columns }) => {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState([]);
    const [activeRows, setActiveRows] = useState({});

    const toggleActive = (rowId) => {
        setActiveRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
    };

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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

    return (
        <div className="w-full">
            <div>
                <Table>
                    <TableHeader >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-[34px] font-normal uppercase text-xs text-gray-500">
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
