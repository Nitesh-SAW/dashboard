"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, SaveAll, Upload, Trash, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import toast from 'react-hot-toast'

const Page = () => {
  const [image, setImage] = useState();
  const { handleSubmit, register, formState: { error }, watch, setValue, reset } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
      setValue("image", file)
    }

  }
  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("title", data.title);
    formdata.append("image", data.image);
    formdata.append("link", data.link);

    try {
      console.log("Form Data Sent:", Object.fromEntries(formdata));
      const response = await axios.post('https://breezend-backend-2.onrender.com/api/portfolio/create-portfolio', formdata);
      console.log(response.status);
      toast.success("Portfolio created successfully");
      reset({
        title: "",
        link: ""
      });
      setValue("image", null);
      setImage(null)

    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error Submitting Form")
    }
  }

  return (
    <section className='mt-16'>
      {/* <header className='flex justify-between items-center px-2 py-3 border-b-2'>
        <h2 className='text-2xl font-semibold'>Create PortFolio</h2>
        <div className='flex justify-center items-center gap-2'>
          <Link href="/dashboard/admin/albums">
            <Button type="button" className="rounded-sm shadow-none hover:bg-transparent bg-inverted text-black ring-1 ring-gray-300 h-8">
              < ArrowLeft />
              Trash
            </Button>
          </Link>
          <Button form="portfolioForm" type="submit" className='rounded-sm ring-1 h-8'>
            <SaveAll />
            Save
          </Button>
        </div>
      </header> */}
      <header className="flex justify-between items-center px-2 py-3 border-b-2">
        <h2 className="text-2xl font-semibold">Create Portfolio</h2>
        <div className="flex justify-center items-center gap-2">
          {/* Back Button */}
          <Link href="/dashboard/admin/albums">
            <Button
              type="button"
              className="rounded-sm shadow-none hover:bg-transparent bg-white text-black ring-1 ring-gray-300 h-8 flex items-center gap-2"
            >
              <ArrowLeft />
              Back
            </Button>
          </Link>

          {/* Save Button */}
          <Button
            form="portfolioForm"
            type="submit"
            className="rounded-sm ring-1 h-8 flex items-center gap-2"
          >
            <SaveAll />
            Save
          </Button>
        </div>
      </header>
      <main>
        <form id='portfolioForm' onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label className="mb-1">Project Title</Label>
            <Input type="text" placeholder="Enter project title" className="border p-2 rounded-md w-full" {...register("title")} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Project Image</Label>
            <div className="relative flex items-center justify-center border-dashed border-2 border-gray-300 rounded-lg p-4 cursor-pointer">
              {image ? (
                <div className="relative">
                  <img src={image} alt="Preview" className="h-28 w-28 object-cover rounded-md" />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-10"
                    onClick={() => setImage(null)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-gray-500" />
                  <span className="text-sm text-gray-500 ml-2">Upload Image</span>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                </>
              )}
            </div>
          </div>


          <Label className="mb-1">Project Link</Label>
          <div className="flex items-center gap-2 border p-2 rounded-md">
            <Link2 size={16} className="text-gray-500" />
            <Input type="url" placeholder="Enter project link" className="flex-1 border-none outline-none"
              {...register("link", { required: "Link is required", pattern: { value: /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/, message: "Enter a valid URL" } })}
            />
          </div>
        </form>
      </main>
    </section>
  )
}

export default Page