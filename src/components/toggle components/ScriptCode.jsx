'use client'
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
const ScriptCode = ({isscriptcode}) => {
  return (
    <>
    {
        isscriptcode && 
        <div className='w-full p-3'>
            <hr />
            <h4 className='font-normal my-4 pl-3'>Script Code</h4>
            <hr />
            <div className="pl-3">
                <Label htmlFor="script">Script code</Label>
                <Textarea id="script" className="w-full h-[30%]"/>
            </div>
        </div>
    }
    </>
  )
}

export default ScriptCode