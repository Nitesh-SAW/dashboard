import React from 'react'
import Link from "next/link"
import { Mail } from "lucide-react"

const page = () => {
    return (
        <section className='w-full min-h-screen'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl'>Feedbacks</h2>
                </ul>
                <ul>
                    <Link href="#" className="flex justify-center items-center gap-2 rounded ring-1 ring-black px-4 py-1">
                        <Mail />
                        <p>Send Email</p>
                    </Link>
                </ul>
            </header>
        </section>
    )
}

export default page