import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CirclePlus, Trash2 } from 'lucide-react'
import ServicesTable from './ServiceTable'

const page = () => {
    return (
        <section className="w-full mx-auto transition-all duration-300 pb-5">
            <header className="w-full flex justify-between items center px-2 py-3">
                <h2 className='text-xl'> Services </h2>
                <div className='flex gap-2'>
                    <Button className="rounded-[1px] shadow-none hover:bg-transparent bg-inverted text-black ring-1 ring-gray-300 h-8">
                        <Trash2 />
                        <p>Trash</p>
                    </Button>
                    <Button className="h-8 rounded-[1px] shadow-none ring-1 ring-gray-300">
                        <Link href="/admin/services/create" className="flex justify-center items-center gap-1">
                            <CirclePlus />
                            <p>Add Services</p>
                        </Link>
                    </Button>
                </div>
            </header>
            <ServicesTable />
        </section>
    )
}

export default page