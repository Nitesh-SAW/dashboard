"use client"
import React from "react"
import SkillTable from "./SkillTable"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const page = () => {
    return (
        <section className='w-full min-h-screen mb-20'>
            <header className='w-full h-14 py-3 mt-16 border-b'>
                <h2 className='text-2xl'>Skills</h2>
            </header>
            <main className="w-full flex gap-2 mt-5">
                <div className="h-32 flex flex-col gap-2 bg-white p-4 rounded">
                    <Label>Skill Name</Label>
                    <Input type="text" />
                    <Button variant="outline" className="w-12 h-8">Save</Button>

                </div>
                <SkillTable />
            </main>
        </section>
    );
}

export default page