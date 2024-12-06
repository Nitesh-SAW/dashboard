"use client"
import Image from "next/image"
import Link from "next/link";
import DataTable from "./pageTable";

const page = () => {

    return (
        <>
            <section className="w-full justify-center relative">
                <header className='w-full max-w-[1280px] h-14 flex justify-between items-center py-3 px-4 fixed bg-muted/100 top-0 right-0 z-50'>
                    <ul>
                        <h2 className='text-2xl'>Page</h2>
                    </ul>
                    <ul>
                        <Link href="/admin/addpage" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                            <Image src="/add.png" alt="add" width='14' height='8' />
                            <p>Create Page</p>
                        </Link>
                    </ul>
                </header>
                <DataTable />
            </section>
        </>
    )
}

export default page