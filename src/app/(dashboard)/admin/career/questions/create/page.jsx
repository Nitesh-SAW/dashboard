"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, ArrowLeft, Trash } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const page = () => {
    const options = [
        { id: 1, value: "Single line Input" },
        { id: 2, value: "Multiline Input" },
        { id: 3, value: "Dropdown options" },
        { id: 4, value: "Multiple Choice" }
    ];

    const [selectedValue, setSelectedValue] = useState("");
    const [isoptions, setISOptions] = useState([""]);

    const handleSelect = (value) => {
        setSelectedValue(value)
    }
    const handleOpen = () => {
        setISOptions((prevOption) => [...prevOption, ""])
    };

    const updateOption = (index, value) => {
        const updatedOptions = [...isoptions];
        updatedOptions[index] = value;
        setISOptions(updatedOptions)
    }

    const deleteOption = (index) => {
        const updatedOptions = isoptions.filter((_, i) => i !== index)
        setISOptions(updatedOptions)
    }

    return (
        <section className='w-full min-h-screen mb-20'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl'>Add Questions</h2>
                </ul>
                <ul className="flex justify-center items-center gap-2">
                    <Link href="/admin/career/questions" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <Plus />
                        <p>Save</p>
                    </Link>
                    <Link href="/admin/career/jobs/questions" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <ArrowLeft />
                        <p>Back</p>
                    </Link>
                </ul>
            </header>
            <main className="w-full flex flex-col gap-4  mt-5">
                <div className="w-full bg-white flex justify-evenly items-center p-4">
                    <div>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Questions?" />
                    </div>
                    <div className="space-x-2 items-baseline">
                        <Checkbox />
                        <Label>is required?</Label>
                    </div>

                </div>
                <div className="bg-white p-4">
                    <div>
                        <Label>Title</Label>
                        <Select onValueChange={handleSelect} defaultValue={selectedValue} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Question Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem value={option.value} key={option.id}>{option.value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {
                            ["Dropdown options", "Multiple Choice"].includes(selectedValue) && (
                                <div>
                                    <span>options</span>
                                    <Button onClick={handleOpen}>Add Options</Button>
                                    {
                                        isoptions.map((option, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={option}
                                                    placeholder={`Option ${index + 1}`}
                                                    onChange={(e) => updateOption(index, e.target.value)}
                                                    className="flex-grow"
                                                />
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => deleteOption(index)}
                                                    aria-label="Remove option"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>
        </section>
    );
}

export default page