'use client'
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
const Ogtags = ({ isogtags }) => {
    return (
        <>
            {isogtags && <div className='w-full p-3'>
                <hr />
                <h4 className=' font-normal my-4 pl-3'>OG TAGS</h4>
                <hr />
                <div className='w-full grid grid-cols-2 gap-8 p-3'>
                    <div>
                        <Label htmlFor="Title">Title</Label>
                        <Input id='Title' />
                        <Label htmlFor="URL">URL</Label>
                        <Input id='URL' />
                        <Label htmlFor="Type">Type</Label>
                        <Input id='Type' />
                    </div>
                    <div>
                        <Label htmlFor="picture">Image
                            <Input type="file" id="picture"/>
                        </Label>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id='description' />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Ogtags