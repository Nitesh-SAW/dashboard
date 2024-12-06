import { Button } from "@/components/ui/button"
import { GrAdd } from "react-icons/gr"
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
            </section>
        </>
    )
}

export default Slider