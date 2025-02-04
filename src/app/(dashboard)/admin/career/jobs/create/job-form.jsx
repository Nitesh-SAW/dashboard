import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import fetchdeparment from "@/lib/features/department";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Editor from "@/components/Editor";
import DynamicSelect from "@/components/Select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Jobform = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        const Job = {
            title: data.title,
            slug: data.slug,
            positions: data.positions,
            shortDescription: data.shortDescription,
            description: "hii i am",
            department: data.department,
            type: data.type,
            gender: data.gender,
            careerLevel: data.careerLevel,
            skills: [data.skills],
            customQuestions: ["explaining responsibilities and qualifications "],
            metaforms: [
                {
                    metatitle: data.metatitle,
                    metedescription: data.metedescription,
                    link: data.link,
                    metaKeywords: [data.metaKeywords],
                },
            ],
        };
        try {
            const response = await fetch("http://localhost:3005/api/job/create-job", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Job),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error Details:", errorDetails);
                throw new Error(errorDetails.message || "Failed to submit the form");
            }

            const result = await response.json();
            console.log("Form submitted successfully:", result);
        } catch (error) {
            console.error("Failed to submit the form", error);
        }
    };

    const dispatch = useDispatch();
    const { departments } = useSelector((state) => state.departments);
    useEffect(() => {
        dispatch(fetchdeparment());
    }, [dispatch]);

    // const [data, setdata] = useState([]);
    // useEffect(() => {
    //   fetch("http://localhost:3005/api/job/get-department")
    //     .then((response) => response.json())
    //     .then((data) => setdata(data))
    //     .catch((error) => console.log("error fetch", error));
    // }, []);

    const [skill, setskill] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3005/api/job/get-skills")
            .then((response) => response.json())
            .then((data) => setskill(data))
            .catch((error) => console.log("error fetch", error));
    }, []);

    const gender = [
        { id: 1, value: "Male" },
        { id: 2, value: "Female" },
        { id: 3, value: "No preference" },
    ];
    const type = [
        { id: 1, value: "Full Time/Permanent" },
        { id: 2, value: "Contract" },
        { id: 3, value: "Frelance" },
        { id: 4, value: "Internship" },
        { id: 5, value: "Part Time" },
    ];
    const career = [
        { id: 1, value: "Department Head" },
        { id: 2, value: "Entry Lavel" },
        { id: 3, value: "Intern/Student" },
        { id: 4, value: "Experienced Professional" },
    ];

    return (
        <section className="w-full justify-center mb-20">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="bg-white text-black rounded-sm p-4">
                    <div className="w-full flex justify-between items-center gap-2">
                        <div className="w-full flex flex-col space-y-2">
                            <Label>Title</Label>
                            <Input {...register("title")} />
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                            <Label>Slug</Label>
                            <Input {...register("slug")} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>Short Description</Label>
                        <Textarea {...register("shortDescription")} />
                    </div>
                    <div className="space-y-1">
                        <Label>Description</Label>
                        {/* <Editor /> */}
                    </div>
                </div>
                <div className="grid grid-cols-2 bg-white text-black rounded-sm p-4 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Department</Label>
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <DynamicSelect
                                        options={state.departments.map((dept) => ({
                                            id: dept.id,
                                            value: dept.department,
                                        }))}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder={"Select Department"}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Type</Label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <DynamicSelect
                                        options={type}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder={"Select Job Type"}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col gap-2 w-1/2">
                                <Label>Positions</Label>
                                <Input type="number" {...register("positions")} />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <Label>Gender</Label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <DynamicSelect
                                            options={gender}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select Gender"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col  gap-2">
                            <Label>Career Level</Label>
                            <Controller
                                name="careerLevel"
                                control={control}
                                render={({ field }) => (
                                    <DynamicSelect
                                        options={career}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Select Career Level"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Skills Required</Label>
                        <div className="flex flex-row justify-between items-baseline">
                            <div className="space-y-2">
                                <Input {...register("skills")} />
                                <ScrollArea className="h-56 w-44 rounded-md border">
                                    {skill.length > 0 ? (
                                        skill.map((skil) => (
                                            <>
                                                <div key={skil.id} className="capitalize px-4">
                                                    {skil.skillname}
                                                </div>
                                                <Separator />
                                            </>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center">Loading...</p>
                                    )}
                                </ScrollArea>
                            </div>
                            <div className="space-y-2">
                                <Input />
                                <ScrollArea className="h-56 w-44 rounded-md border"></ScrollArea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="bg-white text-black rounded-sm p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h2>Custom Questions</h2>
                        <div className="flex gap-2">
                            <Button>Refresh </Button>
                            <Link href="/admin/career/questions">
                                <Button> Add Questions</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="space-x-2 text-base">
                        <Checkbox />
                        <span>
                            Have you communicated with clients globally for any project?
                        </span>
                    </div>
                </div>

                {/* Metatags */}
                <div className="bg-white text-black rounded-sm p-4 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <Label>Meta Title</Label>
                        <Input placeholder="Meta Title" {...register("title")} />
                    </div>
                    <div className="flex flex-col  gap-2">
                        <Label>Meta Description</Label>
                        <Textarea
                            placeholder="Meta Description"
                            {...register("metedescription")}
                        />
                    </div>
                    <div className="flex flex-col  gap-2">
                        <Label>Meta Keywords (comma seperated)</Label>
                        <Input placeholder="add tag" {...register("metaKeywords")} />
                    </div>
                    <div className="flex flex-col  gap-2">
                        <Label>Link Canonical</Label>
                        <Input placeholder="Link Canonical" {...register("link")} />
                    </div>
                </div>
                <Button type="submit">Save</Button>
            </form>
        </section>
    );
};

export default Jobform;
