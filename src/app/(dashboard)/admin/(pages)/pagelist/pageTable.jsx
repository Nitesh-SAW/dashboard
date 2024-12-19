"use client"
import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import { SquarePen, ChevronDown, AlignJustify, X, Filter, Search, Trash2, Eye } from "lucide-react"
import { FaRegEye } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

const data = [
    {
        id: "m5gr84i9",
        active: 316,
        PageTitle: "Home",
        Url: "ken99@yahoo.com",
        CreatedAt: "qwerty1",
        action: ""
    },
    {
        id: "3u1reuv4",
        active: 242,
        PageTitle: "Trade-in Program",
        Url: "Abe45@gmail.com",
        CreatedAt: "qwerty2",
        action: ""
    },
    {
        id: "derv1ws0",
        active: 837,
        PageTitle: "Privacy Policy",
        Url: "Monserrat44@gmail.com",
        CreatedAt: "qwerty3",
        action: ""
    },
    {
        id: "5kma53ae",
        active: 874,
        PageTitle: "Policy & Warranty",
        Url: "Silas22@gmail.com",
        CreatedAt: "qwerty4",
        action: ""
    },
    {
        id: "bhqecj4p",
        active: 721,
        PageTitle: "Refund Policy",
        Url: "carmella@hotmail.com",
        CreatedAt: "qwerty",
        action: ""
    },
    {
        id: "bhqehg4p",
        active: 721,
        PageTitle: "Refund Policy",
        Url: "carmella@hotmail.com",
        CreatedAt: "qwerty",
        action: ""
    },
    {
        id: "bhquyj4p",
        active: 721,
        PageTitle: "Refund Policy",
        Url: "carmella@hotmail.com",
        CreatedAt: "qwerty",
        action: ""
    },
]

const columns = [
    {
        id: "select",
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
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "PageTitle",
        header: "PageTitle",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("PageTitle")}</div>
        )
    },
    {
        accessorKey: "Url",
        header: () => <div className="">Url</div>,
        cell: ({ row }) =>
            <section className="flex">
                <div className="flex justify-center items-center gap-1 lowercase">
                    {row.getValue("Url")}
                    <FaRegEye width={20} height={20} />
                </div>
            </section>
    },
    {
        accessorKey: "CreatedAt",
        header: () => <div>Crated At</div>,
        cell: ({ row }) => <div className="lowercase">{row.getValue("CreatedAt")}</div>
    },
    {
        accessorKey: "active",
        header: () => <div className="text-right">Active</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("active"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => <div className="">Actions</div>,
        cell: () => {

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-10 p-0">
                            <AlignJustify />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem>
                            <SquarePen />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

function DataTable() {
    const [sorting, setSorting] = React.useState([])                    // handle sorting states
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,                    //sorting state function
        getSortedRowModel: getSortedRowModel(),

        onColumnFiltersChange: setColumnFilters,            //Filter Column state function
        getFilteredRowModel: getFilteredRowModel(),         // this config enables filtering

        getCoreRowModel: getCoreRowModel(),                 // this config enables mapping rows values

        getPaginationRowModel: getPaginationRowModel(),

        onColumnVisibilityChange: setColumnVisibility,      // visibility column state function
        onRowSelectionChange: setRowSelection,              // selecting Rows state function
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    })

    console.log(table.getHeaderGroups());
    console.log(table.getRowModel().rows.length);
    console.log(table.getFilteredSelectedRowModel())

    // const handleClear = () => {
    //     setFilterValue("");
    // }

    return (
        <div className="w-full mt-20 bg-white">
            <div className="flex justify-between items-center p-4 relative">
                <div className="flex justify-center items-center gap-1">
                    <Trash2 />
                    <p>({table.getFilteredSelectedRowModel().rows.length})</p>
                </div>
                <div className="w-[25%] h-98 flex relative">
                    <span className="absolute -top-3 left-3 bg-white px-1 z-10">Search By</span>
                    <Input
                        placeholder="Filter Title..."
                        value={table.getColumn("PageTitle")?.getFilterValue() ?? ""}
                        onChange={event =>
                            table.getColumn("PageTitle")?.setFilterValue(event.target.value)
                        }
                        className="rounded-none"
                    />
                    <div className="flex justify-center items-center absolute right-0">
                        <X size={20} onClick={() => table.getColumn("PageTitle")?.setFilterValue('')} />
                        <Button variant="Secondary"><Filter /></Button>
                        <Button className="rounded-none"><Search /></Button>
                    </div>
                </div>

            </div>
            <div className="rounded-md">
                <Table>
                    <TableHeader className="border-t">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="first:hover:bg-transparent first:bg-slate-100"
                                >
                                    {row.getVisibleCells().map(cell => (
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
            <div className="flex items-center justify-end space-x-2 py-4 px-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DataTable