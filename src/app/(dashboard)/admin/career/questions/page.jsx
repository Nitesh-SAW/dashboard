"use client"
import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

const page = () => {
    return (
        <section className='w-full min-h-screen mb-20'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl'>Questions</h2>
                </ul>
                <ul>
                    <Link href="/admin/career/questions/create" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <Plus />
                        <p>Add Questions</p>
                    </Link>
                </ul>
            </header>
            <main className="w-full flex gap-2 mt-5">
            </main>
        </section>
    );
}

export default page