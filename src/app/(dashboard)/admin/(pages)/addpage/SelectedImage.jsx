'use client'
import { useState } from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux'
import { ImEye, ImEyeBlocked, ImCross } from "react-icons/im";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaArrowsAlt } from "react-icons/fa";
import { SendToBack } from "lucide-react"
import { removeSelectedImage, reorderImages } from '@/lib/features/filterSlice'
import DynamicForm from '@/components/form-components/Form';
import { Button } from '@/components/ui/button';


const SelectedImage = () => {

    const [ismask, setIsMask] = useState([])
    const [isFormVisible, setIsFormVisible] = useState({})

    const handleForm = (id) => {
        setIsFormVisible((prev) => ({ ...prev, [id]: !prev[id] }))
    }


    const { selectedImage } = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    const handleDelete = (index) => {
        dispatch(removeSelectedImage(index))
    }
    const handleMask = (Id) => {
        setIsMask(prev =>
            prev.includes(Id) ? prev.filter(item => item !== Id) : [...prev, Id]
        );
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        dispatch(reorderImages({ sourceIndex: source.index, destinationIndex: destination.index }))
    }



    return (
        <section className='w-[98%] min-h-full rounded-sm mt-4 bg-white mx-3 py-6 px-3 relative'>
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
                                                className={`w-full h-64 mt-2 ring-2 ring-black bg-muted-50 relative ${ismask.includes(index) ? "inset-0 bg-white opacity-50" : ""}`}
                                                key={index}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                {isFormVisible[index] ? (
                                                    <div className='relative'>
                                                        <Button className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
                                                            onClick={() => handleForm(index)}
                                                        >
                                                            <SendToBack />
                                                        </Button>
                                                        <DynamicForm imageId={item.id} />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Image src={item.image} alt="image" layout='fill' className='object-fill' />


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

                                                                <li className='rounded-md p-4 bg-white' ><FaRegPenToSquare className='h-[20] w-[20] cursor-pointer' onClick={() => handleForm(index)} /></li>

                                                                <li className='rounded-md p-4 bg-white' {...provided.dragHandleProps} ><FaArrowsAlt className='h-[20] w-[20] cursor-move' /></li>

                                                                <li className='rounded-md p-4 bg-white' ><ImCross className='h-[20] w-[20] cursor-pointer' onClick={() => handleDelete(index)} /></li>
                                                            </ul>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}

export default SelectedImage