"use client";
import React from "react";
import SkillTable from "./SkillTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSkill, updateSkill } from "@/lib/features/skills";
const page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const createskill = (data) => {
    if (selectedSkill) {
      dispatch(
        updateSkill({ id: selectedSkill.id, skillname: data.skillname })
      );
    } else {
      dispatch(addSkill({ skillname: data.skillname }))
    }
    setSelectedSkill(null);
    setValue("skillname", "");

  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setValue("skillname", skill.name);
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
              {selectedSkill ? "Update" : "Save"}
            </Button>
          </div>
        </form>

        <SkillTable onEdit={handleEditSkill} />
      </main>
    </section>
  );
};

export default page;
