"use client";
import React, { useState, useEffect, useRef } from "react";
import DynamicSelect from "@/components/Select";
import LogTable from "./LogTable";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";


const page = () => {


  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [filteredOptions, setFilteredOptions] = useState([]);

  // const handleSelect = (value) => {
  //   setInputValue(value);
  //   setIsOpen(false); // Close dropdown after selection
  // };

  const options = ["Today", "Yestorday", "Last 7 Days", "Last 30 Days", "This Month", "This Year"];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);
  };
  const handleInputClick = () => {
    setIsOpen(true);
    setFilteredOptions(options); // Poora list dikhane ke liye
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const Options = [
    { id: 1, value: "user", label: "User" },
    { id: 2, value: "admin", label: "Admin" },
    { id: 3, value: "none", label: "None" },
    { id: 4, value: "home", label: "Home" },
    { id: 5, value: "about us", label: "About us" },
    { id: 6, value: "superadmin", label: "Super Admin" }
  ];

  return (
    <>
      <section className="w-full justify-center relative mt-16">
        <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
          <h2 className='text-2xl'>Logs</h2>
        </header>
        <div className="flex gap-2 mt-5">
          <DynamicSelect
            placeholder="Select"
            options={Options}
          />

          <div className="w-1/2 relative" ref={dropdownRef}>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleInputClick}
              placeholder="Select a fruit..."
              className=""
            />
            {isOpen && (
              <div className="w-1/2 absolute right-0 text-start bg-white cursor-pointer z-50">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li key={index} onClick={() => handleSelect(option)} className="m-2 p-0.5 list-none border-1 rounded-sm first:bg-blue-400 bg-slate-200 hover:bg-blue-400">
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="list-none">No options found</li>
                )}
                <div className="w-full space-x-2">
                  <Button>Submit</Button>
                  <Button>Clear</Button>
                </div>
              </div>
            )}
          </div>

          <Button>Generate Log</Button>
        </div>
        <LogTable />
      </section >
    </>
  );
};

export default page;
