"use client";
import React from "react";
import SkillTable from "./SkillTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createskill = async (data) => {
    console.log(data);
    const skills = {
      skillname: data.skillname,
    };
    try {
      const response= await fetch("http://localhost:3005/api/job/add-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skills),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error Details:", errorDetails);
        throw new Error(errorDetails.message || "Failed to submit the skill");
      }

      const result = await response.json();
      console.log("Skill submitted successfully:", result);
    } catch (error) {
      console.log("Failed to create", error);
    }
  };

  return (
    <section className="w-full min-h-screen mb-20">
      <header className="w-full h-14 py-3 mt-16 border-b">
        <h2 className="text-2xl">Skills</h2>
      </header>
      <main className="w-full flex gap-2 mt-5">
        <form onSubmit={handleSubmit(createskill)}>
          <div className="h-32 flex flex-col gap-2 bg-white p-4 rounded">
            <Label>Skill Name</Label>
            <Input type="text" {...register("skillname")} />
            <Button variant="outline" className="w-12 h-8" type="submit">
              Save
            </Button>
          </div>
        </form>

        <SkillTable />
      </main>
    </section>
  );
};

export default page;
