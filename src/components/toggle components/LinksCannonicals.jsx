'use client'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
const LinksCannonicals = ({ islinkscannonicals }) => {
    return (
        <>
            {islinkscannonicals &&
                <div className='w-full p-3'>
                    <hr />
                    <h4 className='font-normal my-4 pl-3'>LINK CANONICAL</h4>
                    <hr />
                    <div className='relative pl-3'>
                        <Label htmlFor="href">href</Label>
                        <Input type="text" id="href"></Input>
                        <Button
                            type="submit"
                            variant="destructive"
                            className='absolute top-6 right-1 py-0 rounded-sm'
                        >Add</Button>
                    </div>
                </div>}
        </>
    )
}

export default LinksCannonicals