"use client"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicSelect from "@/components/Select";
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const initialData = {
    Appllied: [{ id: "1", content: "Item 1" }],
    PhoneScreen: [{ id: "2", content: "Item 2" }],
    Interview: [{ id: "3", content: "Item 3" }],
    Hired: [{ id: "4", content: "Item 4" }],
    Rejected: [{ id: "5", content: "Item 5" }]
};

const options = [
    { id: 1, value: "option" },
    { id: 2, value: "option2" },
    { id: 3, value: "option3" },
    { id: 4, value: "option4" },
    { id: 5, value: "option5" }
]

const DraggableColumns = () => {
    const [columns, setColumns] = useState(initialData);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            // Same column drag & drop
            const reorderedItems = [...sourceColumn];
            const [movedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, movedItem);

            setColumns({ ...columns, [source.droppableId]: reorderedItems });
        } else {
            // Different column drag & drop
            const sourceItems = [...sourceColumn];
            const destItems = [...destColumn];
            const [movedItem] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, movedItem);

            setColumns({
                ...columns,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destItems,
            });
        }
    };

    return (
        <section className="w-full mt-16">
            <div className="flex justify-between items-center gap-2">
                <DynamicSelect options={options} placeholder={"Select..."} />
                <Input placeholder="Input" />
                <Button>Add</Button>
            </div>
            <div className="w-[98%] mt-5">
                <DragDropContext onDragEnd={onDragEnd} className>
                    <div className="flex space-x-4 px-4 min-w-max">
                        {

                            Object.keys(columns).map((colId) => (
                                <Droppable key={colId} droppableId={colId}>
                                    {
                                        (provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="w-64 px-4 bg-gray-200 rounde d-md min-h-[300px] flex flex-col"
                                            >
                                                <h2 className="text-center p-2 font-bold mb-2">{colId}</h2>
                                                <div className="flex-1 overflow-y-auto max-h-[200px] flex flex-col">
                                                    {columns[colId].map((item, index) => (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="p-2 bg-white border rounded-md text-center cursor-pointer"
                                                                >
                                                                    {item.content}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )
                                    }
                                </Droppable>
                            ))

                        }</div>
                </DragDropContext>
            </div>
        </section>
    );
};

export default DraggableColumns;
