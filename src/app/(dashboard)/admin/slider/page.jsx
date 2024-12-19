import { Button } from "@/components/ui/button"
import { GrAdd } from "react-icons/gr"
import Slidertable from "./Slidertable"
const Slider = () => {
    return (
        <>
            <section className="w-full mx-auto">
                <header className="w-full flex justify-between items center px-2 py-3">
                    <h2 className="text-2xl">Slider</h2>
                    <Button>
                        <GrAdd />
                        Add Slider
                    </Button>
                </header>
                <Slidertable />
            </section>
        </>
    )
}

export default Slider