'use client'
import { useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableCell,
    TableRow
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { Toggle } from "@/components/ui/toggle";
import { ImEye, ImEyeBlocked, ImBin } from "react-icons/im"
import { SquarePen, AlignJustify, X, Filter, Search, Files } from "lucide-react";


const data = [
    { id: 1, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 2, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 3, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 4, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 5, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 6, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 7, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 8, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 9, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
    { id: 10, Name: "Clients", type: "Slider", active: "", Createdat: "", action: "" },
]

const columns = [
    {
        id: "Select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        accessorKey: 'Name',
        header: 'Name',
        cell: ({ row }) => (
            <div>{row.getValue('Name')}</div>
        )
    },
    {
        accessorKey: 'type',
        header: 'Type'
    },
    {
        accessorKey: 'active',
        header: 'Active',
        cell: () => {
            const [isYes, setIsYes] = useState(true);
            return (
                <Toggle
                    pressed={isYes}
                    onPressedChange={setIsYes}
                    className={`!text-white w-5 h-5 ${isYes ? "!bg-green-600" : "!bg-red-400"}`}
                >
                    {isYes ? "Yes" : "No"}
                </Toggle >
            )
        }
    },
    {
        accessorKey: 'Createdat',
        header: 'Created At'
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <AlignJustify />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!min-w-4 absolute -right-2 bg-black pointer-events-none">
                    <Button className="w-15 h-5 space-x-1">
                        <SquarePen />
                        <DropdownMenuSeparator className="text-white" />
                        <Files />
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
]

const Slidertable = () => {

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: setPagination,
            state: {
                pagination
            }
        }
    )
    console.log(table)
    return (
        <section className="w-full mt-20 bg-white">
            <div className="flex justify-between items-center p-4 relative">
                <div className="flex justify-center items-center gap-4">
                    <ImBin size={20} />
                    <p>({table.getFilteredSelectedRowModel().rows.length})</p>
                </div>
                <div className="w-[25%] h-98 flex relative">
                    <span
                        className='absolute -top-3 left-3 bg-white z-10 px-1'
                    >Search by</span>
                    <Input
                        placeholder="Name"
                        className="rounded-none"
                        value={table.getColumn('Name')?.getFilterValue() ?? ""}
                        onChange={event =>
                            table.getColumn("Name")?.setFilterValue(event.target.value)
                        }
                    />
                    <div className="flex justify-center items-center gap-1 absolute right-0">
                        <X size={20} className="cursor-pointer" onClick={() => table.getColumn("Name")?.setFilterValue("")} />
                        <Button variant="Secondary" className="w-0 h-9">
                            <Filter size={20} />
                        </Button>
                        <Button className="rounded-none">
                            <Search size={20} />
                        </Button>

                    </div>
                </div>

            </div>

            <div className="overflow-x-auto rounded-lg mt-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroups) => (
                            <TableRow key={headerGroups.id}>
                                {headerGroups.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
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
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="w-full flex justify-between items-center p-4 mr-auto relative">
                <div className="w-[20%] flex items-center gap-1">
                    <span className="capitalize">Item per page:</span>
                    <Select
                        value={pagination.pageSize}
                        onValueChange={(value) => {
                            const pageSize = Number(value)
                            setPagination((prev) => ({ ...prev, pageSize }))
                            table.setPageSize(pageSize)
                        }}
                    >
                        <SelectTrigger className="w-20">
                            <SelectValue>{pagination.pageSize}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className="!min-w-[4rem]">
                            {[5, 10, 15, 20].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize} className="!min-w-[4rem]">
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <p className="w-full">Go to page:</p>
                    <select
                        value={pagination.pageIndex + 1} // Show page numbers starting from 1
                        onChange={(e) => handlePageChange(Number(e.target.value) - 1)} // Set page index (0-based)
                        className="p-2 border border-gray-300 rounded overflow-hidden"
                    >
                        {/* Dynamically generate options for each page */}

                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    )
}

export default Slidertable