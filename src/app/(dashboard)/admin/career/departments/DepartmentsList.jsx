'use client'
import React, { useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    ColumnFiltering,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { ImEye, ImEyeBlocked, ImBin } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { AlignJustify, SquarePen, X, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import DataTable from '@/components/data-table/DataTable';

const data = [
    {
        id: "1",
        name: "Home",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "2",
        name: "about",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "3",
        name: "contect",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "4",
        name: "sliders",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "5",
        name: "banners",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "6",
        name: "selectors",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "7",
        name: "select",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "8",
        name: "Renders",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "9",
        name: "Traders",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "10",
        name: "post",
        active: "",
        createdat: "",
        action: "",
    },
];

const columns = [
    {
        id: "Select",
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
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <div>{row.getValue("id")}</div>;
        },
    },
    {
        accessorKey: "name",
        header: <div className='w-44'>Name</div>,
        cell: ({ row }) => {
            return <div className='min-w-10'>{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "active",
        header: "Active",
        cell: () => {
            const [isYes, setIsYes] = useState(false);
            return (
                <Toggle
                    pressed={isYes}
                    onPressedChange={setIsYes}
                    className={`!text-white w-5 h-5 ${isYes ? "!bg-green-600" : "!bg-red-400"
                        }`}
                >
                    {isYes ? "Yes" : "No"}
                </Toggle>
            );
        },
    },
    {
        accessorKey: "createdat",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdat"));
            const formattedDate = date.toLocaleDateString("en-GB");

            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: "action",
        header: <div className='w-10'>Action</div>,
        cell: () => (
            <Button variant="outline">
                <SquarePen />
            </Button>

        ),
    },
];

const DepartmentList = () => {
   
 



    return (
        <DataTable data={data} columns={columns} />
    )
}

export default DepartmentList