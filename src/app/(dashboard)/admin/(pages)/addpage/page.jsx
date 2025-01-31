"use client"
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineSave } from "react-icons/md";
import Createpage from './Createpage'
import SelectedImage from './SelectedImage';
import CustomCss from './CustomCss';
// import { Button } from '@/components/ui/button'
import { useForm, Controller } from 'react-hook-form'

const page = () => {

  const { control, handleSubmit, setValue, unregister } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <section className="w-full min-h-screen justify-center items-center relative">
      <header className="w-full h-12  flex justify-between items-center py-3 mt-16 border-b">

        <div className="pl-2">
          <h1 className="text-2xl">Create New Page</h1>
        </div>

        <div className='flex justify-evenly items-center gap-2'>
          <button type="submit" form="createPageForm" className='flex justify-center items-center ring-1 rounded-sm ring-black px-4 py-1'>
            <MdOutlineSave />
            <p>Create</p>
          </button>
          <Link href="/admin/pagelist" className='flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1'>
            <IoMdArrowRoundBack />
            <p>Back</p>
          </Link>
        </div>

      </header >


      <main className='mt-5 pb-20'>
        <form id="createPageForm" onSubmit={handleSubmit(onSubmit)}>
          <Createpage control={control} setValue={setValue} />
          <SelectedImage />
          <CustomCss control={control} unregister={unregister} />
        </form>
      </main>
    </section >
  )
}

export default page