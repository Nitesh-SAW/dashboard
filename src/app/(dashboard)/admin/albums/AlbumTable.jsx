'use client'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImEye, ImEyeBlocked, ImBin } from "react-icons/im"
import { SquarePen, ChevronDown, AlignJustify, X, Filter, Search, Trash2, Eye } from "lucide-react"

const columnHelper = createColumnHelper()


const data = [
    {
        id: "m5gr84i9",
        Image: 316,
        Title: "Home",
        Active: "",
        CreatedAt: "qwerty1",
        Action: ""
    },
    {
        id: "3u1reuv4",
        Image: 242,
        Title: "Trade-in Program",
        Active: "",
        CreatedAt: "qwerty2",
        Action: ""
    },
    {
        id: "derv1ws0",
        Image: 837,
        Title: "Privacy Policy",
        Active: "",
        CreatedAt: "qwerty3",
        Action: ""
    },
    {
        id: "5kma53ae",
        Image: 874,
        Title: "Policy & Warranty",
        Active: "",
        CreatedAt: "qwerty4",
        Action: ""
    },
    {
        id: "bhqecj4p",
        Image: 721,
        Title: "Refund Policy",
        Active: "",
        CreatedAt: "qwerty",
        Action: ""
    }
]

const columns = [
    columnHelper.accessor("id", {
        header: () => (
            <span>
                <Checkbox />
            </span>
        ),
        cell: (info) => (
            <Checkbox

            />
        )
    }),
    columnHelper.accessor("Image", {
        cell: (info) => info.getValue(),
        header: () => (
            <span>Image</span>
        )
    }),
    columnHelper.accessor("Title", {
        cell: (info) => info.getValue(),
        header: () => (
            <span>Title</span>
        )
    }),
    columnHelper.accessor("Active", {
        cell: (info) => (<Checkbox />),
        header: () => (
            <span>Active</span>
        )
    }),
    columnHelper.accessor("CreatedAt", {
        cell: (info) => info.getValue(),
        header: () => (
            <span>CreatedAt</span>
        )
    }),
    columnHelper.accessor("Action", {
        header: () => (
            <span>action</span>
        ),
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <AlignJustify />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenu>
                        <SquarePen />
                    </DropdownMenu>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    })
]



const albumTable = () => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

    })

    return (
        <>
            <section className="w-full mt-20 bg-white">
                <div className="flex justify-center items-center p-4 mr-auto relative">
                    <div className="flex justify-center items-center gap-4">
                        <ImBin size={20} />
                        <ImEye size={20} />
                        <ImEyeBlocked size={20} />
                        <p>(0)</p>
                    </div>

                    <Input
                        placeholder="Title"
                        className="max-w-sm ml-auto"
                    />
                    <div className="flex justify-center items-center absolute gap-4 right-4 w-[10%] cursor-pointer">
                        <X className="cursor-pointer" />
                        <Filter className="" />
                        <Search className="text-slate-50 bg-black w-2/6 h-8" />
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {console.log(row)}
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    )
}

export default albumTable