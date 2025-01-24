'use client'
import React from 'react'
import Link from 'next/link'
import { Save, ArrowLeft } from 'lucide-react'
import Jobform from './job-form'

const page = () => {
    return (<>
        <header className="w-full h-12  flex justify-between items-center py-3 mt-16 border-b">

            <div className="pl-2">
                <h1 className="text-2xl">Add Job</h1>
            </div>

            <div className='flex justify-evenly items-center gap-2'>
                <Link href="/admin/career/jobs" className='flex justify-center items-center ring-1 rounded-sm ring-black px-4 py-1'>
                    <ArrowLeft />
                    <p>Back</p>
                </Link>
                <Link href="#" className='flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1'>
                    <Save />
                    <p>Save</p>
                </Link>
            </div>
        </header >
        <Jobform />
    </>
    )
}

export default page