"use client"
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import Selector from '@/components/Selector'
import SelectComponent from "./SelectComponent";
import React,{useState} from 'react'
import { Switch } from "@/components/ui/switch";


const createpage = () => {

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
            <section className='w-[98%] mt-3 bg-white mx-3 py-3'>
                <div className='flex justify-start items-center gap-6 rounded-sm px-5 py-2'>
                    <div className='w-[25%] flex flex-col'>
                        <label htmlFor="Title">Title</label>
                        <input type="text" className='rounded ring-[1px] ring-slate-400 px-6 py-1 mt-1' />
                    </div>
                    <div className='w-[25%] flex flex-col'>
                        <label htmlFor="">https://mainitsol.com/</label>
                        <input type="text" className='rounded ring-[1px] ring-slate-400 px-6 py-1 mt-1' />
                    </div>
                    <div className='w-[25%] flex flex-col'>
                        <label htmlFor="">Parent</label>
                        <Selector />
                    </div>
                    <div className='w-[10%] flex flex-col justify-start items-start gap-2'>
                        <label htmlFor="">Active</label>
                        <Switch />
                    </div>
                </div>
                <div className='w-full flex justify-center items-center py-1 mt-2'>
                    <div className='w-[97%] flex justify-center items-center rounded-sm bg-slate-100 ring-[1px] ring-slate-500 py-1'
                    onClick={handleOpenModal}>
                        <IoMdAdd />
                        <button>
                            Add Section
                        </button>
                    </div>
                </div>
            </section>
            <SelectComponent isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}

export default createpage