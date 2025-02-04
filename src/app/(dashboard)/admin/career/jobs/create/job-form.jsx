import React from 'react'
import Link from "next/link"
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Editor from '@/components/Editor'
import DynamicSelect from '@/components/Select'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from '@/components/ui/separator'
import { ArrowRightLeft } from 'lucide-react'
import { FaRegBuilding } from 'react-icons/fa6'

const Jobform = () => {
    const { register, control, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        // const Job = {
        //     title: data.title,
        //     slug: data.slug,
        //     positions: data.positions,
        //     shortDescription: data.shortDescription,
        //     description: "This is a detailed job description explaining responsibilities and qualifications.",
        //     department: data.department,
        //     type: data.type,
        //     gender: data.gender,
        //     careerLevel: data.careerLevel,
        //     skills: [
        //         "React",
        //         "Node.js",
        //         "GraphQL"
        //     ],
        //     customQuestions: [
        //         "explaining responsibilities and qualifications "
        //     ],
        //     metaforms: [
        //         {
        //             title: "SEO Optimization",
        //             metedescription: data.metedescription,
        //             link: data.link,
        //             metaKeywords: data.metaKeywords
        //         }
        //     ]
        // }
        // console.log(Job)
        // try {
        //     const response = await fetch("https://breezend-backend-2.onrender.com/api/job/create-job", {
        //         method: "POST",
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(Job),
        //     });

        //     if (!response.ok) {
        //         const errorDetails = await response.json();
        //         console.error("Error Details:", errorDetails);
        //         throw new Error(errorDetails.message || "Failed to submit the form");
        //     }

        //     const result = await response.json();
        //     console.log("Form submitted successfully:", result);
        // }
        // catch (error) {
        //     console.error('Failed to submit the form', error)
        // }
    }

    const options = [
        { id: 1, value: "Single line Input" },
        { id: 2, value: "Multiline Input" },
        { id: 3, value: "Dropdown options" },
        { id: 4, value: "Multiple Choice" }
    ];
    const gender = [
        { id: 1, value: "No preference" },
        { id: 2, value: "Male" },
        { id: 3, value: "Female" }
    ];
    const type = [
        { id: 1, value: "Full Time/Permanent" },
        { id: 2, value: "Contract" },
        { id: 3, value: "Frelance" },
        { id: 4, value: "Internship" },
        { id: 5, value: "Part Time" }
    ];
    const career = [
        { id: 1, value: "Department Head" },
        { id: 2, value: "Entry Lavel" },
        { id: 3, value: "Intern/Student" },
        { id: 4, value: "Experienced Professional" }
    ];

    const list = [
        { id: 1, value: "Department Head" },
        { id: 2, value: "Entry Lavel" },
        { id: 3, value: "Intern/Student" },
        { id: 4, value: "Experienced " },
        { id: 5, value: "Professional " },
        { id: 6, value: "Department Head" },
        { id: 7, value: "Entry Lavel" },
        { id: 8, value: "Intern/Student" },
        { id: 9, value: "Experienced " },
        { id: 0, value: "Professional " }
    ]

    return (
        <section className='w-full justify-center mb-20'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col flex-wrap mt-6 space-y-4'>
                <div className='bg-white text-black rounded-sm p-4'>
                    <div className='w-full flex justify-between items-center gap-2'>
                        <div className="w-full flex flex-col space-y-2">
                            <Label>Title</Label>
                            <Input {...register("title")} />
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                            <Label>Slug</Label>
                            <Input {...register("slug")} />
                        </div>
                    </div>
                    <div className='space-y-1'>
                        <Label>Short Description</Label>
                        <Textarea {...register("shortDescription")} />
                    </div>
                    <div className='space-y-1'>
                        <Label>Description</Label>
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <Editor
                                    value={field.value}
                                    onChange={(data) => setValue("editor", data)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 bg-white text-black rounded-sm p-4 gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Department</Label>
                            <Controller
                                name='department'
                                control={control}
                                render={({ field }) => (<DynamicSelect options={options}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select Department"
                                />)}

                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Type</Label>
                            <Controller
                                name='type'
                                control={control}
                                render={({ field }) => (
                                    <DynamicSelect options={type} value={field.value} onChange={field.onChange} placeholder="Select Type" />
                                )}
                            />
                        </div>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-2 w-1/2'>
                                <Label>Positions</Label>
                                <Input type="number" {...register("positions")} />
                            </div>
                            <div className='flex flex-col gap-2 w-1/2'>
                                <Label>Gender</Label>
                                <Controller
                                    name='gender'
                                    control={control}
                                    render={({ field }) => (
                                        <DynamicSelect options={gender} value={field.value} onChange={field.onChange} placeholder="Select Gender" />
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col  gap-2'>
                            <Label>Caeer Level</Label>
                            <Controller
                                name='careerLevel'
                                control={control}
                                render={({ field }) => (
                                    <DynamicSelect options={career} value={field.value} onChange={field.onChange} placeholder="Select Career Lavel" />
                                )}
                            />
                        </div>
                    </div>
                    <div className='px-10'>
                        <Label>Skills Required</Label>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='space-y-2 w-44'>
                                <Input placeholder="Search..."  {...register("skills")} />
                                <ScrollArea className="h-56 rounded-md border">
                                    {list.map((item) => (
                                        <ul key={item.id} className='cursor-pointer'>
                                            {item.value}
                                            <Separator />
                                        </ul>
                                    ))}
                                </ScrollArea>
                            </div>
                            <ArrowRightLeft className='text-slate-500 bold' />
                            <div className='space-y-2 w-44'>
                                <Input placeholder="Search..." />
                                <ScrollArea className="h-56 rounded-md border">
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className='bg-white text-black rounded-sm p-4 flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <h2>Custom Questions</h2>
                        <div className='flex gap-2'>
                            <Button>Refresh </Button>
                            <Link href="/admin/career/questions">
                                <Button> Add Questions</Button>
                            </Link>
                        </div>
                    </div>
                    <div className='space-x-2 text-base'>
                        <Checkbox />
                        <span>Have you communicated with clients globally for any project?</span>
                    </div>
                </div>

                {/* Metatags */}
                <div className='bg-white text-black rounded-sm p-4 flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Label>Meta Title</Label>
                        <Input placeholder="Meta Title" {...register("title")} />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <Label>Meta Description</Label>
                        <Textarea placeholder="Meta Description" {...register("metedescription")} />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <Label>Meta Keywords (comma seperated)</Label>
                        <Input placeholder="add tag" {...register("metaKeywords")} />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <Label>Link Canonical</Label>
                        <Input placeholder="Link Canonical" {...register("link")} />
                    </div>
                </div>
                <Button type="submit">Save</Button>
            </form>
        </section>
    )
}

export default Jobform