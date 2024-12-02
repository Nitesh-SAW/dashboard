'use client'
import React from 'react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
const TweeterTag = ({ istweetertag }) => {
    return (
        <>
            {istweetertag &&
                <div className='w-full p-3'>
                    <hr />
                    <h4 className='font-normal my-4 pl-3'>TWITTER TAGS</h4>
                    <hr />
                    <div className='w-full grid grid-cols-2 gap-8 p-3'>
                    <div>
                        <Label htmlFor="Title">Title</Label>
                        <Input id='Title' />
                        <Label htmlFor="URL">URL</Label>
                        <Input id='URL' />
                        <Label htmlFor="card">Card</Label>
                        <Input id='card' />
                    </div>
                    <div>
                        <Label htmlFor="picture">Image</Label>
                        <Input id="picture" type="file" />

                        <Label htmlFor="description">Description</Label>
                        <Textarea id='description' />
                    </div>
                </div>
                </div>}
        </>
    )
}

export default TweeterTag