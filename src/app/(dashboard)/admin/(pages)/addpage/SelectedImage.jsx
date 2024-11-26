'use client'
import { useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux'
import { ImEye, ImEyeBlocked, ImCross } from "react-icons/im";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaArrowsAlt } from "react-icons/fa";
import { removeSelectedImage, reorderImages } from '@/lib/features/filterSlice'


const SelectedImage = () => {

    const [ismask, setIsMask] = useState([])


    const { selectedImage } = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    const handleDelete = (index) => {
        dispatch(removeSelectedImage(index))
    }
    const handleMask = (index) => {
        setIsMask(prev =>
            prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index]
        );
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        dispatch(reorderImages({ sourceIndex: source.index, destinationIndex: destination.index }))
    }



    return (
        <section className='w-[98%] rounded-sm mt-4 bg-white mx-3 py-6 px-3 relative'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='imagelist' direction='vertical'>
                    {(provided) => (
                        <div className='grid grid-rows-1 gap4'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                selectedImage.map((item, index) => (
                                    <Draggable key={index} draggableId={String(index)} index={index}>
                                        {(provided) => (
                                            <div
                                                className={`w-full h-64 mt-2 ring-2 ring-black relative ${ismask.includes(index) ? "inset-0 bg-white opacity-50" : ""}`}
                                                key={index}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <Image src={item} alt="image" layout='fill' className='object-cover' />
                                                <div
                                                    className="w-[98%] ml-3 bg-black bg-opacity-40 absolute inset-0 flex justify-center items-center"
                                                >
                                                    <ul className='flex justify-center items-center rounded-sm gap-5'>

                                                        {
                                                            ismask.includes(index) ? (
                                                                <li className='rounded-md p-4 bg-white'>
                                                                    <ImEyeBlocked className='h-[20] w-[20] cursor-pointer' onClick={() => handleMask(index)} />
                                                                </li>
                                                            ) : (
                                                                <li className='rounded-md p-4 bg-white'>
                                                                    <ImEye className='h-[20] w-[20] cursor-pointer' onClick={() => handleMask(index)} />
                                                                </li>
                                                            )
                                                        }

                                                        <li className='rounded-md p-4 bg-white' ><FaRegPenToSquare className='h-[20] w-[20] cursor-pointer' /></li>

                                                        <li className='rounded-md p-4 bg-white' {...provided.dragHandleProps} ><FaArrowsAlt className='h-[20] w-[20] cursor-pointer'/></li>

                                                        <li className='rounded-md p-4 bg-white' ><ImCross className='h-[20] w-[20] cursor-pointer' onClick={() => handleDelete(index)} /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}

export default SelectedImage