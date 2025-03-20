'use client'
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImEye, ImEyeBlocked, ImBin } from "react-icons/im"
import { SquarePen, AlignJustify, X, Filter, Search, Files } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";



const AlbumTable = () => {

    const [data, setData] = useState([]);
    // console.log(data);

    const columns = [
        {
            accessorKey: "id",
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
            accessorKey: "image",
            header: "Image",
            cell: (row) => (
                <div className="capitalize">
                    <img src={row.getValue("image")} alt="Image" className="h-8 w-10 object-cover" />
                </div>
            )
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => {
                // console.log(row.getValue('title'))
                return (
                    < div > {row.getValue("title")}</div >
                )
            }
        },
        {
            accessorKey: "link",
            header: "Link",
            cell: ({ row }) => {
                // const [isYes, setIsYes] = useState(true)
                return (
                    <div>
                        <Link href={`${row.getValue('link')}`} target="_blank" rel="noopener noreferrer"><Eye width={20} height={20} /></Link>
                    </div>
                )
            }
        },
        {
            accessorKey: "active",
            header: "Active",
            cell: ({ row }) => {
                const [isActive, setIsActive] = useState(row.getValue("active"));
                const portfolioId = row.original.id;


                const handleToggleActive = async () => {
                    console.log(portfolioId)
                    try {
                        const response = await axios.put(`https://breezend-backend-2.onrender.com/api/portfolio/edit-active`,
                            {
                                id: portfolioId,
                                "active": !isActive
                            }
                        );
                        setIsActive(!isActive);
                        toast.success(response.data.message);
                    } catch (error) {
                        console.error("225", error.response?.data)
                        toast.error("Failed to update status");
                    }
                };

                return (
                    <button
                        value={isActive}
                        onClick={handleToggleActive}
                        className={`w-10 h-6 rounded-full transition-all ${isActive ? "bg-green-600" : "bg-red-400"
                            }`}
                    >
                        {isActive ? "true" : "false"}
                    </button>
                );
            },
        },
        {
            accessorKey: "created_at",
            header: "Created at",
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue("created_at")}
                </div>
            )

        },
        {
            accessorKey: "Action",
            header: "Action",
            cell: ({ row }) => {
                const id = row.original.id
                return (
                    <>
                        {id}
                        <Link href={`/dashboard/admin/albums/${id}/edit`}><SquarePen /></Link>

                    </>
                );
            }
        }

    ]

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://breezend-backend-2.onrender.com/api/portfolio/get-all-portfolio');
                console.log(response.data.message);
                setData(response.data.allPortfolio)
            } catch (error) {
                // console.error("Get Portfolio API Error", error.response.data || "Somethings went wrong");
            }
        }
        fetchData()
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getRowId: (row) => row.id,
        state: {
            pagination
        },
    })



    // Handle page index change (select page number)
    const handlePageChange = (pageIndex) => {
        setPagination((prev) => ({ ...prev, pageIndex }));
        table.setPageIndex(pageIndex);
    };

    // Handle delete rows
    const handleDelete = async (selectedIds) => {

        if (selectedIds.length === 0) {
            toast.error("No rows are selected for delete");
            return;
        };
        const confirmDelete = async () => {
            return new Promise((resolve) => {
                toast(
                    (t) => (
                        <div>
                            <p>Are you sure you want to delete selected portfolios?</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(true);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(false);
                                    }}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    ),
                    { duration: Infinity }
                );
            });
        };
        const confirmed = await confirmDelete();
        if (!confirmed) {
            return;
        }
        try {
            const response = await axios.post(`https://breezend-backend-2.onrender.com/api/portfolio/delete-portfolio`,
                { id: selectedIds }
            )
            console.log("Deleted successfully:", response.data);
            toast.success("Selected rows deleted successfully!")
            setData((prevData) => prevData.filter((item) => !selectedIds.includes(item.id)));
            resetSelection();
        } catch (error) {
            console.error("Delete Portfolio API error", error.response.data || "Something wents wrong");
            toast.error("Failed to delete items.");
        }
    }

    //Handle activate rows
    const handleActive = async (selectedIds, selectedAction) => {
        if (selectedIds.length === 0) {
            toast.error("No portfolios are selected")
            return
        }
        const confirmDelete = async () => {
            return new Promise((resolve) => {
                toast(
                    (t) => (
                        <div>
                            <p>Are you sure you want to active selected portfolios?</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(true);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(false);
                                    }}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    ),
                    { duration: Infinity }
                );
            });
        };
        const confirmed = await confirmDelete();

        if (!confirmed) {
            return;
        }
        try {

            const response = await axios.put(`https://breezend-backend-2.onrender.com/api/portfolio/edit-active`,
                {
                    id: selectedIds,
                    "active": true
                }
            )
            console.log("Activated successfully:", response.data.message);
            toast.success("Selected portfolios activated successfully!");
            console.log(data)
            setData(prevData =>
                prevData.map(item =>
                    selectedIds.includes(item.id) ? { ...item, active: true } : item
                )
            );

            table.resetRowSelection();
        } catch (error) {
            toast.error("Failed to Activate items");
        }
    }

    //Handle Deactivate portfolios
    const handleDeactive = async (selectedIds) => {
        if (selectedIds.length === 0) {
            toast.error("No portfolio are selected")
            return
        }
        const confirmDelete = async () => {
            return new Promise((resolve) => {
                toast(
                    (t) => (
                        <div>
                            <p>Are you sure you want to deactivate selected portfolios?</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(true);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        resolve(false);
                                    }}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    ),
                    { duration: Infinity }
                );
            });
        };

        const confirmed = await confirmDelete();


        if (!confirmed) {
            return;
        }

        try {
            const response = await axios.put(`https://breezend-backend-2.onrender.com/api/portfolio/edit-active`,
                {
                    id: selectedIds,
                    "active": false
                }
            )
            console.log("Deactivated successfully:", response.data);
            toast.success("Selected portfolios deactivated successfully!");
            setData(prevData =>
                prevData.map(item =>
                    selectedIds.includes(item.id) ? { ...item, active: false } : item
                )
            );
            table.resetRowSelection();
        } catch (error) {

            toast.error("Failed to Deactivate Portfolio.");
        }
    }

    return (
        <>
            <section className="w-full mt-5 bg-white">

                {/* Filter Sorting */}

                <div className="flex justify-between items-center p-4 relative">
                    <div className="flex justify-center items-center gap-4">
                        <ImBin size={20} className="cursor-pointer"
                            onClick={() => { handleDelete(table.getSelectedRowModel().rows.map(row => row.original.id)) }}
                        />
                        <ImEye size={20} onClick={() => { handleActive(table.getSelectedRowModel().rows.map(row => row.original.id)); }} />
                        <ImEyeBlocked size={20} onClick={() => { handleDeactive(table.getSelectedRowModel().rows.map(row => row.original.id)) }} />
                        <p>({table.getFilteredSelectedRowModel().rows.length})</p>
                    </div>
                    <div className="w-[25%] h-98 flex relative">
                        <span
                            className='absolute -top-3 left-3 bg-white z-10 px-1'
                        >Search by</span>
                        <Input
                            placeholder="Title"
                            className="rounded-none"
                            value={table.getColumn('title')?.getFilterValue() ?? ""}
                            onChange={event =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                        />
                        <div className="flex justify-center items-center gap-1 absolute right-0">
                            <X size={20} className="cursor-pointer" onClick={() => table.getColumn("Title")?.setFilterValue("")} />
                            <Button variant="Secondary" className="w-0 h-9">
                                <Filter size={20} />
                            </Button>
                            <Button className="rounded-none">
                                <Search size={20} />
                            </Button>

                        </div>
                    </div>

                </div>

                {/* Table */}

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
                                    <TableRow
                                        key={row.id}
                                    // data-state={row.getIsSelected() && "selected"}
                                    >
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


                {/* pagination */}


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
                                {[10, 20, 50, 100].map((pageSize) => (
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
        </>
    )
}

export default AlbumTable