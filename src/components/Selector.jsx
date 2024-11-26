"use client"
import React, { useState, useRef } from 'react'
import { BiChevronDown } from "react-icons/bi";
import useOutsideClick from './custom hooks/Closedropdown';

const Selector = () => {

    const [selectOption, setSelectOption] = useState("None")
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const options = [
        { key: 1, Option: "None" },
        { key: 2, Option: "Home" },
        { key: 3, Option: "About Us" },
        { key: 4, Option: "Service Locations" },
        { key: 5, Option: "Professionals Associations" },
        { key: 6, Option: "Associations of Cpmouter Repair" },
        { key: 8, Option: "Album" },
        { key: 9, Option: "Contact Us" },
        { key: 10, Option: "Search" },
        { key: 11, Option: "Certifications" },
        { key: 12, Option: "Privacy Policy" },
        { key: 13, Option: "Career" },
        { key: 14, Option: "Refund Policy" },
        { key: 15, Option: "Policy & Warranty" },
        { key: 16, Option: "Trade In Program" }
    ]

    const uniqueOptions = options.filter((object, index, self) =>
        index === self.findIndex((key) => (key.key == object.key))
    )

    const filterOptions = uniqueOptions.filter((option) => (
        option.Option.toLowerCase().includes(searchQuery.toLowerCase())
    ))

    const handleChange = (value) => (
        setSelectOption(value),
        setIsOpen(false)
    )

    const dropdownRef = useOutsideClick(() => setIsOpen(false));

    return (
        <>
                <section className="w-full mx-auto" ref={dropdownRef}>
                    <div className="relative" >

                        <button
                            className=" flex justify-between items-center w-full text-left rounded text-black ring-[1px] ring-slate-300 focus:ring-slate-800 py-1 px-3 duration-200"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {selectOption}
                            <BiChevronDown
                                className={`transition-transform duration-400 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            />
                        </button>

                        {/* Options List */}
                        {isOpen && (
                            <div
                                className="absolute w-full max-h-60 overflow-y-auto mt-1 bg-white border border-slate-300 rounded shadow-lg"
                                style={{ zIndex: 100 }}
                            >
                                <input
                                    type='text'
                                    value={searchQuery}
                                    placeholder='Search...'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='w-[95%] ring-[1px] ring-slate-200 mx-2 mt-1 px-1 py-1 text-sm'
                                />

                                {filterOptions.map((option) => (
                                    <div
                                        key={option.key}
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleChange(option.Option)}
                                    >
                                        {option.Option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
        </>
    )
}

export default Selector
