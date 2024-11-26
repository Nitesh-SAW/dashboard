'use client'
import React from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedImage } from '@/lib/features/filterSlice'

const FilteredImages = () => {
    const { filteredItems } = useSelector((state) => state.filter)
    const dispatch = useDispatch();



    const hanleClickImage = (image) => {
        dispatch(setSelectedImage(image))
    }

    return (
        <>
            <section className='h-[95vh] flex flex-col mb-4 px-4 overflow-y-scroll'>
                <div className='mb-16'>
                    {
                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className='mt-1 px-4'
                            >
                                <Image
                                    className='rounded-sm ring-4 ring-white mt-4'
                                    src={item.image}
                                    alt='Image'
                                    width={1080}
                                    height={720}
                                    onClick={() => hanleClickImage(item.image)} />
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default FilteredImages