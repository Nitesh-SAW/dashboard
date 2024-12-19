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
      <header className="w-full s:max-w-[81%] lg:max-w-[83.4%] md:max-w-[81%] h-14 flex justify-between items-center py-3 px-4 fixed bg-muted/100 top-0 right-0 z-50">

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


      <main className='mt-20 pb-20'>
        <Createpage />
        <SelectedImage />
        <CustomCss />
      </main>
    </section >
  )
}

export default page