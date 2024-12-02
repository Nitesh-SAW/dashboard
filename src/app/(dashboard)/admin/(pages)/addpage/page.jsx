"use client"
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import Createpage from './Createpage'
import SelectedImage from './SelectedImage';
import CustomCss from './CustomCss';

const page = () => {
  return (
    <section className="w-full h-screen justify-center items-center relative">
      <header className="w-full h-14 bg-slate-100 flex justify-between items-center py-3 pr-4 sticky top-0 z-40">

        <div className="pl-2">
          <h1 className="text-2xl">Create New Page</h1>
        </div>

        <div className='flex justify-evenly items-center gap-2'>
          <Link href="/admin/pagelist" className='flex justify-center items-center px-1 ring-1 rounded-sm ring-black'>
            <MdOutlineSave />
            <p>Create</p>
          </Link>
          <Link href="/admin/pagelist" className='flex justify-center items-center px-1 ring-1 rounded-sm  ring-black'>
            <IoMdArrowRoundBack />
            <p>Back</p>
          </Link>
        </div>

      </header >


      <main className='pb-20'>
        <Createpage />
        <SelectedImage />
        <CustomCss />
      </main>
    </section >
  )
}

export default page