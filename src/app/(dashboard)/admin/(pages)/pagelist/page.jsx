import Image from "next/image"
import Link from "next/link";

const page = () => {

    return (
        <>
            <section className="w-full justify-center">
                <nav className='flex w-[98%] justify-between items-center mt-3 mx-3 px-4 py-2 shadow-md bg-white rounded'>
                    <ul>
                        <h2 className='text-2xl'>Page</h2>
                    </ul>
                    <ul>
                        <Link href="/admin/addpage" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                            <Image src="/add.png" alt="add" width='14' height='8' />
                            <p>Create Page</p>
                        </Link>
                    </ul>
                </nav>
                <main>
                </main>
            </section>
        </>
    )
}

export default page