import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'

const page = () => {
  return (
    <section className="w-full mx-auto transition-all duration-300 pb-5">
      <header className="w-full flex justify-between items center px-2 py-3">
        <h2 className='text-xl'> Services </h2>
        <div className='flex gap-2'>
          <Button className="rounded-[1px] shadow-none hover:bg-transparent bg-inverted text-black ring-1 ring-gray-300 h-8">
            <Save />
            <p>Save</p>
          </Button>
          <Button className="h-8 rounded-[1px] shadow-none ring-1 ring-gray-300">
            <Link href="/admin/services/create" className="flex justify-center items-center gap-1">
              <ArrowLeft />
              <p>Back To Service Listing</p>
            </Link>
          </Button>
        </div>
      </header>
    </section>
  )
}

export default page