"use client"
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import FilterDropdown from '@/components/FilterDropdown';
import FilteredImages from '@/components/FilteredImages';

const SelectComponent = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <section className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50"
                onClick={onClose}>
                <div
                    className="fixed right-0 w-1/2 h-full bg-slate-200 rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='w-full flex justify-between items-center px-4 bg-white relative'>
                        <div className='w-[45%] flex justify-start items-baseline'>
                            <h2 className='text-2xl p-3'>
                                Select Component
                            </h2>
                            <FilterDropdown />
                        </div>
                        <button
                            onClick={onClose}
                            className='absolute top-0 right-0 h-14 w-14 flex justify-center items-center text-2xl hover:bg-black hover:text-white transition-all duration-300'
                        >
                            <RxCross2
                                className='group-hover:rotate-[720deg] transition-transform duration-400'
                            />
                        </button>
                    </div>
                    <FilteredImages />
                </div>
            </section>
        </>
    )
}

export default SelectComponent;
