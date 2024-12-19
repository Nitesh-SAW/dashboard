import { Button } from "@/components/ui/button"
import Link from "next/link"
const page = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center gap-4">
        <h2>Landing Page :-</h2>
        <Button>
          <Link href={"/admin/home"}>Go to the Dashboard</Link>
        </Button>
      </div>
    </>

  )
}

export default page