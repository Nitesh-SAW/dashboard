"use client"
import React from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, ArrowLeft } from "lucide-react"
import DynamicSelect from "@/components/Select"

const page = () => {
    return (
        <section className='w-full min-h-screen mb-20'>
            <header className='w-full h-14 flex justify-between items-center py-3 mt-16 border-b'>
                <ul>
                    <h2 className='text-2xl'>Add Questions</h2>
                </ul>
                <ul className="flex justify-center items-center gap-2">
                    <Link href="/admin/career/questions" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <Plus />
                        <p>Save</p>
                    </Link>
                    <Link href="/admin/career/jobs/questions" className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1">
                        <ArrowLeft />
                        <p>Back</p>
                    </Link>
                </ul>
            </header>
            <main className="w-full flex flex-col gap-4  mt-5">
                <div className="w-full bg-white flex p-4">
                    <div>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Questions?" />
                    </div>
                    <div>
                        <Checkbox />
                        <Label>is required?</Label>
                    </div>

                </div>
                <div className="bg-white p-4">
                    <div>
                        <Label>Title</Label>
                        <DynamicSelect />
                    </div>
                </div>
            </main>
        </section>
    );
}

export default page