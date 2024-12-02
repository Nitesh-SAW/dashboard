'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import React from 'react'

const Metatags = ({ isOn }) => {
    return (
        <>
            {isOn && <div className='w-full p-3'>
                <hr />
                <h4 className='font-normal my-4 pl-3'>META TAGS</h4>
                <hr />
                <div className='w-full grid grid-cols-2 gap-8 p-3'>
                    <div>
                        <Label htmlFor="Meta-Title">Meta Title</Label>
                        <Input type="text" id="Meta-Title" />
                        <Label htmlFor="Meta-Keywords">Meta Keywords</Label>
                        <Input type="text" id="Meta-Keywords" />
                    </div>
                    <div>
                        <Label htmlFor="Meta-Keywords">Meta Keywords</Label>
                        <Textarea id="Meta-Keywords" />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Metatags