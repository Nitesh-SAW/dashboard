'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByName } from '@/lib/features/filterSlice';
import { BiChevronDown } from 'react-icons/bi';
import useOutsideClick from './custom hooks/Closedropdown';

const FilterDropdown = () => {
    const { selectedItems } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    // State to track selected category
    const [selectedCategory, setSelectedCategory] = useState('All');

    // State to handle dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);




    const handleFilterChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            dispatch(filterByName('All'));
        } else {
            dispatch(filterByName(category));
        }
        setIsDropdownOpen(false);  // Close dropdown after selection
    };

    useEffect(()=>{
        dispatch(filterByName('All'));
    }, [dispatch])

    const dropdownRef = useOutsideClick(() => setIsDropdownOpen(false));

    return (
        <section className="filter-Container relative w-[20%] mx-auto" ref={dropdownRef}>
            {/* Custom dropdown trigger */}
            <button className="dropdown-toggle w-[95%] flex justify-between items-center px-1 mx-1 ring-1 ring-black text-xs text-" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {selectedCategory}
                <BiChevronDown
                    className={`transition-transform duration-400 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
                <div
                    className="dropdown-menu absolute w-full ml-[2.5] mt-1 bg-white border border-slate-300 rounded-sm shadow-lg overflow-auto"
                    style={{ zIndex: 100 }}
                >
                    {selectedItems.map((item) => (
                        <div
                            key={item.id}
                            className="text-sm pl-1 dropdown-item cursor-pointer hover:bg-sky-500 hover:text-white"
                            onClick={() => handleFilterChange(item.name)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FilterDropdown;