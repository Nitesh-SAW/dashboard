"use client";
import React from "react";
import DepartmentsList from "./DepartmentsList";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { adddepartment, updateDepartment } from "@/lib/features/department";

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [selectedDepartment, setselectedDepartment] = useState(null);

  const createdepartment = (data) => {
    if (selectedDepartment) {
      dispatch(
        updateDepartment({
          id: selectedDepartment.id,
          department: data.department,
        })
      );
    } else {
      dispatch(adddepartment({ department: data.department }));
    }
    setselectedDepartment(null);
    setValue("department", "");
  };

  const handleUpdatedepartment = (dep) => {
    setselectedDepartment(dep);
    setValue("department", dep.name);
  };

  return (
    <section className="w-full min-h-screen mb-20">
      <header className="w-full h-14 py-3 mt-16 border-b">
        <h2 className="text-2xl">Department</h2>
      </header>
      <main className="w-full flex gap-2 mt-5">
        <form onSubmit={handleSubmit(createdepartment)}>
          <div className="h-32 flex flex-col gap-2 bg-white p-4 rounded">
            <Label> Department Name</Label>
            <Input type="text" {...register("department")} />
            <Button variant="outline" className="w-12 h-8" type="submit">
              {selectedDepartment ? "Update" : "Save"}
            </Button>
          </div>
        </form>

        <DepartmentsList onEdit={handleUpdatedepartment} />
      </main>
    </section>
  );
};

export default Page;
