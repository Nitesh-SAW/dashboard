import { Button } from "@/components/ui/button"
import { GrAdd, GrTrash } from "react-icons/gr"
import AlbumTable from "./AlbumTable"
const Album = () => {
    return (
        <>
            <section className="w-full mx-auto transition-all duration-300">
                <header className="w-full flex justify-between items center px-2 py-3">
                    <h2 className="text-2xl">Album</h2>
                    <div className="flex gap-2">
                        <Button className="rounded-[1px] shadow-none hover:bg-transparent bg-inverted text-black ring-1 ring-gray-300 h-8">
                            <GrTrash/>
                            Trash
                        </Button>
                        <Button className="h-8 rounded-[1px] shadow-none ring-1 ring-gray-300">
                            <GrAdd />
                            Add Album
                        </Button>
                    </div>
                </header>
                <AlbumTable />
            </section>
        </>
    )
}

export default Album