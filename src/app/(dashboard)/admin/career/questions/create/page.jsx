"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, ArrowLeft, Trash } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Page = () => {

  const dispatch = useDispatch();
  const { handleSubmit, register, formState: { errors }, control, setValue, watch, reset } = useForm({
    defaultValues: {
      options: []
    },
  });

  const options = [
    { id: 1, value: "SINGLE_LINE" },
    { id: 2, value: "MULTI_LINE" },
    { id: 3, value: "DROPDOWN" },
    { id: 4, value: "MULTIPLE_CHOICE" },
  ];

  const selectedValue = watch("questionType")
  const formOptions = watch("options") ?? [];

  const handleSelect = (value) => {
    setValue("questionType", value)
  };
  const handleOpen = () => {
    setValue("options", [...formOptions, ""])
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...formOptions];
    updatedOptions[index] = value;
    setValue("options", updatedOptions);
  };

  const deleteOption = (index) => {
    const updatedOptions = formOptions.filter((_, i) => i !== index);
    setValue("options", updatedOptions);
  };

  const onSubmit = (data) => {
    if (!["DROPDOWN", "MULTIPLE_CHOICE"].includes(data.questionType)) {
      delete data.options
    }


    dispatch(createQuestion(data)).unwrap()
      .then(() => {
        toast.success("Question Created Successfully");
        reset({
          title: "",
          questionType: "",
          options: []
        });
      })
      .catch((error) => {
        console.error("Error creating question")
      })
  }

  return (
    <section className="w-full min-h-screen mb-20">
      <header className="w-full h-14 flex justify-between items-center py-3 mt-16 border-b">
        <ul>
          <h2 className="text-2xl">Add Questions</h2>
        </ul>
        <ul className="flex justify-center items-center gap-2">
          <Button
            type="submit"
            form="questionForm"
            className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1"
          >
            <Plus />
            <p>Save</p>
          </Button>
          <Link
            href="/dashboard/admin/career/questions"
            className="flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1"
          >
            <ArrowLeft />
            <p>Back</p>
          </Link>
        </ul>
      </header>
      <main className="w-full flex flex-col gap-4  mt-5">
        <form id="questionForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full bg-white flex justify-evenly items-center p-4">
            <div>
              <Label>Title</Label>
              <Input type="text" placeholder="Questions?" {...register("title", { required: true })} />
            </div>
            <div className="space-x-2 items-baseline">
              {/* <Controller
                name="checked"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              /> */}
              <Checkbox />
              <Label>is required?</Label>
            </div>
          </div>
          <div className="bg-white p-4">
            <div>
              <Label>QuestionType</Label>
              <Controller
                name="questionType"
                control={control}
                rules={{ required: "Question type is required" }}
                render={({ field }) => (
                  <Select onValueChange={handleSelect} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {["DROPDOWN", "MULTIPLE_CHOICE"].includes(
                selectedValue
              ) && (
                  <div>
                    <div className="w-full h-12 flex justify-between items-center">
                      <span>Options</span>
                      <Button type="button" onClick={handleOpen}>Add Options</Button>
                    </div>
                    {formOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-4 mt-2">
                        <Input
                          value={option}
                          placeholder={`Option ${index + 1}`}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="flex-grow"
                        />
                        <Button type="button" variant="destructive" size="sm" onClick={() => deleteOption(index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Page;