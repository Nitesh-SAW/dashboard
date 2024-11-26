import React from 'react'

const ScriptCode = ({isscriptcode}) => {
  return (
    <>
    {
        isscriptcode && 
        <div className='w-full mt-6 p-3'>
            <hr />
            <h2 className='text-xl'>Script Code</h2>
            <hr />
            <div>

            </div>
        </div>
    }
    </>
  )
}

export default ScriptCode