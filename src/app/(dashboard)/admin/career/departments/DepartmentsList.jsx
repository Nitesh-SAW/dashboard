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
    //     const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });

    //     const table = useReactTable({
    //         data,
    //         columns,
    //         getCoreRowModel: getCoreRowModel(),
    //         getFilteredRowModel: getFilteredRowModel(),
    //         getPaginationRowModel: getPaginationRowModel(),
    //         onPaginationChange: setPagination,
    //         getRowId: (row) => row.id,
    //         state: {
    //             pagination,
    //         },
    //     });

    //     const handleChange = (pageIndex) => {
    //         setPagination((prev) => ({ ...prev, pageIndex }));
    //         table.setPageIndex(pageIndex);
    //     };

    //     return (
    //         <section className="w-full mt-5 mb-5 bg-white">
    //             {/* Filter options*/}
    //             <div className="w-full h-20 flex justify-between items-center px-2 py-2">
    //                 <div className="flex justify-center items-center gap-4">
    //                     <ImBin size={20} />
    //                     <p>({table.getFilteredSelectedRowModel().rows.length})</p>
    //                 </div>
    //                 <div className="w-[25%] h-98 flex relative">
    //                     <span className="absolute -top-3 left-3 bg-white z-10 px-1">
    //                         Search by
    //                     </span>
    //                     <Input
    //                         placeholder="Title"
    //                         className={`rounded-none focus:outline-none`}
    //                         value={table.getColumn("name")?.getFilterValue() ?? ""}
    //                         onChange={(event) =>
    //                             table.getColumn("name")?.setFilterValue(event.target.value)
    //                         }
    //                     />
    //                     <div className="flex justify-center items-center gap-1 absolute right-0 ">
    //                         <X
    //                             size={20}
    //                             onClick={() => table.getColumn("name")?.setFilterValue("")}
    //                         />
    //                         <Button variant="ghost" className="w-0 h-9 rounded-none">
    //                             <Filter size={20} />
    //                         </Button>
    //                         <Button className="rounded-none">
    //                             <Search size={20} />
    //                         </Button>
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Service Table */}
    //             <div className="overflow-x-auto rounded-lg">
    //                 <Table>
    //                     <TableHeader>
    //                         {table.getHeaderGroups().map((headerGroup) => (
    //                             <TableRow key={headerGroup.id}>
    //                                 {headerGroup.headers.map((header) => (
    //                                     <TableHead key={header.id}>
    //                                         {flexRender(
    //                                             header.column.columnDef.header,
    //                                             header.getContext()
    //                                         )}
    //                                     </TableHead>
    //                                 ))}
    //                             </TableRow>
    //                         ))}
    //                     </TableHeader>
    //                     <TableBody>
    //                         {table.getRowModel().rows.map((row) => (
    //                             <TableRow key={row.id}>
    //                                 {row.getVisibleCells().map((cell) => (
    //                                     <TableCell key={cell.id}>
    //                                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //                                     </TableCell>
    //                                 ))}
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </div>

    //             <div className="w-full flex justify-between items-center p-4 mr-auto relative">
    //                 <div className="w-[20%] flex items-center gap-1">
    //                     {/* pagination */}
    //                     <span className="capitalize">Item per page:</span>
    //                     <Select
    //                         value={pagination.pageSize}
    //                         onValueChange={(value) => {
    //                             const newSize = Number(value);
    //                             setPagination((prev) => ({ ...prev, newSize }));
    //                             table.setPageSize(newSize);
    //                         }}
    //                     >
    //                         <SelectTrigger className="w-20">
    //                             <SelectValue>{pagination.pageSize}</SelectValue>
    //                         </SelectTrigger>
    //                         <SelectContent className="!min-w-[4rem]">
    //                             {[25, 50, 100].map((size) => (
    //                                 <SelectItem key={size} value={size} className="!min-w-[4rem]">
    //                                     {size}
    //                                 </SelectItem>
    //                             ))}
    //                         </SelectContent>
    //                     </Select>
    //                 </div>
    //                 <div className="flex justify-center items-center gap-4">
    //                     <span className="w-full">Goto:</span>
    //                     <Select
    //                         value={pagination.pageIndex + 1}
    //                         onValueChange={(value) => handleChange(Number(value) - 1)}
    //                     >
    //                         <SelectTrigger>
    //                             <SelectValue>{pagination.pageIndex + 1}</SelectValue>
    //                         </SelectTrigger>
    //                         <SelectContent>
    //                             {Array.from({ length: table.getPageCount() }, (_, i) => (
    //                                 <SelectItem key={i} value={i + 1}>
    //                                     {i + 1}
    //                                 </SelectItem>
    //                             ))}
    //                         </SelectContent>
    //                     </Select>
    //                 </div>
    //             </div>
    //         </section>
    //     );
    // }
    return (
        <DataTable data={data} columns={columns} />
    )
}

export default DepartmentList