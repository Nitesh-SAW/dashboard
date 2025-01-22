import React from 'react'
import Link from "next/link"
import Image from "next/image"
import JobTable from './jobTable'

const page = () => {
    return (
        <section className='w-full min-h-screen'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl'>Jobs</h2>
                </ul>
                <ul>
                    <Link href="/admin/career/jobs/create" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <Image src="/add.png" alt="add" width='14' height='8' />
                        <p>Create Job</p>
                    </Link>
                </ul>
            </header>
            <JobTable />
        </section>
    )
}

export default page
