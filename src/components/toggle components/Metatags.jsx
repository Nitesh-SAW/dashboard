import React from 'react'

const Metatags = ({ isOn }) => {
    return (
        <>
            {isOn && <div className='w-full mt-6 p-3'>
                <hr />
                <p className=' text-xl'>META TAGS</p>
                <hr />
                <div className='w-full grid grid-cols-2 gap-8 p-3'>
                    <div></div>
                    <div></div>
                </div>
            </div>}
        </>
    )
}

export default Metatags