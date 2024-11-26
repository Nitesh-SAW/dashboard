import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    return (
        <>
            <section className='flex w-full shadow-md p-4 bg-white'>

                <div className='flex items-center gap-2 text-xs rounded-full px-5 py-1 ring-[1.5px] ring-slate-500'>
                    <Image
                        src="/searchbar.png"
                        alt='searchbar'
                        width='20'
                        height='20'
                        className='brightness-0'
                    />
                    <input
                        type="text"
                        placeholder='search here...'
                        className='outline-none text-lg-[5rem]'
                    />
                </div>
            </section>
        </>
    )
}

export default Navbar