import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Editor from '@/components/Editor'

const Jobform = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-6 space-y-4'>
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
                        <Textarea />
                    </div>
                </div>
                <div className='bg-white text-black rounded-sm p-4 gap-2'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <Label>Department</Label>
                            <Input />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label>Type</Label>
                            <Input />
                        </div>
                        <div className='flex flex-col gap-2 w-1/2'>
                            <Label>Positions</Label>
                            <Input />
                        </div>
                        <div className='flex flex-col gap-2 w-1/2'>
                            <Label>Gender</Label>
                            <Input />
                        </div>
                        <div className='flex flex-col  gap-2'>
                            <Label>Career Level</Label>
                            <Editor />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
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
        </>
    )
}

export default Jobform