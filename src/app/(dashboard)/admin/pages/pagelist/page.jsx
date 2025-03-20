"use client"
import { useState, useEffect } from "react";
import { Plus } from "lucide-react"
import Link from "next/link";
import DataTable from "./pageTable";

const Page = () => {

    return (
        <>
            <section className="w-full justify-center relative">
                <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                    <ul>
                        <h2 className='text-2xl'>Page</h2>
                    </ul>
                    <ul>
                        <Link href="/admin/pages/addpage" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                            <Plus />
                            <p>Create Page</p>
                        </Link>
                    </ul>
                </header>
                <DataTable />
            </section>
        </>
    )
}

export default Page