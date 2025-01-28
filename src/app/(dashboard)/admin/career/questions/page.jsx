"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Plus, AlignJustify, SquarePen } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import DataTable from "@/components/data-table/DataTable";

const data = [
    {
        id: "1",
        title: "Home",
        department: "No Parent",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "2",
        title: "about",
        department: "Computer Services",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "3",
        title: "contect",
        department: "Printer Support Services",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "4",
        title: "sliders",
        department: "Home Security Systems",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "5",
        title: "banners",
        department: "No department",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "6",
        title: "selectors",
        department: "	Computer Services",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "7",
        title: "select",
        department: "No department",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "8",
        title: "Renders",
        department: "Computer Services",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "9",
        title: "Traders",
        department: "Computer Services",
        active: "",
        createdat: "",
        action: "",
    },
    {
        id: "10",
        title: "post",
        department: "No Parent",
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
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return <div>{row.getValue("title")}</div>;
        },
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => {
            return <div>{row.getValue("department")}</div>;
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
        header: "Action",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <AlignJustify />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!min-w-4 absolute -right-2 bg-black pointer-events-none">
                    <Button className="w-20 h-6 space-x-1">
                        <SquarePen />
                    </Button>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

const page = () => {
    return (
        <section className='w-full min-h-screen mb-20'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl'>Questions</h2>
                </ul>
                <ul>
                    <Link href="/admin/career/questions/create" className="flex justify-center items-center gap-2 rounded bg-black text-white px-2 py-1">
                        <Plus />
                        <p>Add Questions</p>
                    </Link>
                </ul>
            </header>
            <main className="w-full flex gap-2 mt-5">
                <DataTable data={data} columns={columns} />
            </main>
        </section>
    );
}

export default page