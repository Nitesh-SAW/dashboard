"use client";
import React from "react";
import DepartmentsList from "./DepartmentsList";
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

  const createdepartment = async (data) => {
    console.log(data);
    const depatm = {
      department: data.department,
    };
    try {
      const response = await fetch(
        "http://localhost:3005/api/job/create-dpartment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(depatm),
        }
      );
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error Details:", errorDetails);
        throw new Error(
          errorDetails.message || "Failed to submit the department"
        );
      }

      const result = await response.json();
      console.log("department submitted successfully:", result);
    } catch (error) {
      console.log("Failed to create", error);
    }
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
              Save
            </Button>
          </div>
        </form>

        <DepartmentsList  />
      </main>
    </section>
  );
};

export default page;
