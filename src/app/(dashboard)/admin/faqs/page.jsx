"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus } from "lucide-react"
import axios from 'axios'
import DataTable from "@/components/data-table/DataTable";
import { Checkbox } from '@/components/ui/checkbox'
import { Toggle } from '@/components/ui/toggle'

const Page = () => {

    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://breezend-backend-2.onrender.com/api/faq/get-Faq")
                setFaqData(response.data)
            } catch (error) {
                console.error("Get Faq Api error", error.response?.data || "Something went wrong")
            }
        };
        fetchData();
    }, [])

    const data = faqData.map((item) => ({
        id: item.id,
        title: item.question,
        description: item.answer,
        active: item.active,
        createdAt: item.created_at,
    }));

    const columns = [
        {
            id: "id",
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
            accessorKey: "title",
            header: <div className="w-44">Title</div>,
            cell: ({ row }) => {
                return <div className="min-w-10">{row.getValue("title")}</div>;
            },
        },
        {
            accessorKey: "description",
            header: <div className="w-44">Description</div>,
            cell: ({ row }) => {
                return <div className="min-w-10">{row.getValue("description")}</div>;
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
            accessorKey: "createdAt",
            header: <div className="w-24">CreatedAt</div>,
            cell: ({ row }) => {
                const date = row.getValue("createdAt");
                const formatedDate = new Date(date).toLocaleDateString("en-US")
                return <div className="min-w-10">{formatedDate}</div>;
            },
        },
    ];


    const handleDelete = async (selectedIds) => {
        if (selectedIds.length === 0) {
            alert("No rows are selected for delete")
        };

        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} row`)) {
            return;
        }

        try {
            const response = await axios.post(`https://breezend-backend-2.onrender.com/api/faq/delete-faq`,
                { id: selectedIds }
            )
            console.log("Deleted successfully:", response.data);
            alert("Selected rows deleted successfully!");
            setFaqData((prevData) => prevData.filter(item => !selectedIds.includes(item.id)));
        } catch (error) {
            console.error("Delete FAQ API error", error.response?.data || "Something wents wrong")
        }
    }

    return (
        <section className='mt-16'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl font-semibold'>FAQS List</h2>
                </ul>
                <ul>
                    <Link href="/dashboard/admin/faqs/create" className="flex items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <Plus />
                        <p>Create FAQS</p>
                    </Link>
                </ul>
            </header>
            <div className='mt-5'>
                <DataTable data={data} columns={columns} handleDelete={handleDelete} />
            </div>
        </section>
    )
}

export default Page