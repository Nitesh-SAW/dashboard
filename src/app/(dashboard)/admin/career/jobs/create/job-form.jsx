import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Editor from '@/components/Editor'
import DynamicSelect from '@/components/Select'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from '@/components/ui/separator'

const Jobform = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {

    }
    return (
        <section className='w-full justify-center mb-20'>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
                <div className='bg-white text-black rounded-sm p-4'>
                    <div className='w-full flex justify-between items-center gap-2'>
                        <div className="w-full flex flex-col space-y-2">
                            <Label>Title</Label>
                            <Input />
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                            <Label>Slug</Label>
                            <Input />
                        </div>
                    </div>
                    <div>
                        <Label>Short Description</Label>
                        <Textarea />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input />
                        {/* <Editor /> */}
                    </div>
                </div>
                <div className='grid grid-cols-2 bg-white text-black rounded-sm p-4 gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Department</Label>
                            <DynamicSelect />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Type</Label>
                            <DynamicSelect />
                        </div>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-2 w-1/2'>
                                <Label>Positions</Label>
                                <Input />
                            </div>
                            <div className='flex flex-col gap-2 w-1/2'>
                                <Label>Gender</Label>
                                <DynamicSelect />
                            </div>
                        </div>
                        <div className='flex flex-col  gap-2'>
                            <Label>Career Level</Label>
                            <DynamicSelect />
                        </div>
                    </div>
                    <div>
                        <Label>Skills Required</Label>
                        <div className='flex flex-row justify-between items-baseline'>
                            <div className='space-y-2'>
                                <Input />
                                <ScrollArea className="h-56 w-44 rounded-md border">

                                </ScrollArea>
                            </div>
                            <div className='space-y-2'>
                                <Input />
                                <ScrollArea className="h-56 w-44 rounded-md border">

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
                            <Button> Add Questions</Button>
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
                        <Input placeholder="Meta Title" />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <Label>Meta Description</Label>
                        <Textarea placeholder="Meta Description" />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <Label>Meta Keywords (comma seperated)</Label>
                        <Input placeholder="add tag" />
                    </div>
                    <div className='flex flex-col  gap-2'>
                        <Label>Link Canonical</Label>
                        <Input placeholder="Link Canonical" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Jobform