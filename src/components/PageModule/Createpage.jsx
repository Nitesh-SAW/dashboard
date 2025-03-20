"use client"
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import Selector from '@/components/Selector';
import SelectComponent from "./SelectComponent";
import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";


const Createpage = () => {

    const { control, reset } = useFormContext();

    const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

    // Open the modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <section className='w-[98%] rounded-sm mt-3 bg-white mx-3 py-3'>
                <div className='flex justify-start items-center gap-6 rounded-sm px-5 py-2'>
                    <div className='w-[25%] flex flex-col'>
                        <label htmlFor="Title">Title</label>
                        {/* <input type="text" className='rounded ring-[1px] ring-slate-400 px-6 py-1 mt-1' /> */}
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input id="Title" className="rounded-sm h-8" {...field} />
                            )}
                        />
                    </div>
                    <div className='w-[25%] flex flex-col'>
                        <label htmlFor="mainitsol">https://mainitsol.com/</label>
                        {/* <input type="text" className='rounded ring-[1px] ring-slate-400 px-6 py-1 mt-1' /> */}
                        <Controller
                            name="url"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input id="mainitsol" className="rounded-sm h-8" {...field} />
                            )}
                        />

                    </div>
                    <div className='w-[25%] flex flex-col'>
                        <label htmlFor="">Parent</label>
                        <Controller
                            name="parent"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Selector {...field} value={field.value} onChange={field.onChange} className="cursor-pointer" />
                            )} />

                    </div>
                    <div className='w-[10%] flex flex-col justify-start items-start gap-2'>
                        <label htmlFor="">Active</label>
                        <Controller
                            name="active"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value === true}
                                    onCheckedChange={(checked) => field.onChange(checked ? true : false)}
                                />
                            )} />
                    </div>
                </div>
                <div className='w-full flex flex-wrap justify-center items-center py-1 mt-2'>
                    <div className='w-[97%] flex justify-center items-center rounded-sm bg-slate-100 ring-[1px] ring-slate-500 py-1'
                        onClick={handleOpenModal}>
                        <ul className="flex justify-center items-center cursor-pointer">
                            <IoMdAdd />
                            Add Section
                        </ul>
                    </div>
                </div>
            </section>
            <SelectComponent isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}

export default Createpage