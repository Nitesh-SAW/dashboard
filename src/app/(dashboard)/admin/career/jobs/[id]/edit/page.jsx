"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchdepartment } from "@/lib/features/department";
import { addSkill, fetchSkills } from "@/lib/features/skills";
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
import { fetchqustion } from "@/lib/features/qustionslice";
import { addJob } from "@/lib/features/addJob";
import { updateJobs } from '@/lib/features/addJob'
import axios from 'axios'

const Editjob = () => {
    const { id } = useParams();
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            selectedSkills: [],
            metaKeywords: [],
            selectedQuestions: []
        },
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchSkills()).unwrap(),
                    dispatch(fetchdepartment()).unwrap()
                ]);
                const response = await axios.get(`https://breezend-backend-2.onrender.com/api/job/edit/${id}`)
                const jobData = response.data;

                reset({
                    title: jobData.title,
                    slug: jobData.slug,
                    shortDescription: jobData.shortDescription,
                    department: jobData.department,
                    type: jobData.type,
                    positions: jobData.positions,
                    gender: jobData.gender,
                    careerLevel: jobData.careerLevel,
                    selectedSkills: jobData.skills.map(item => item.text),
                    metatitle: jobData.metaforms?.[0]?.metatitle,
                    metedescription: jobData.metaforms?.[0]?.metedescription,
                    metaKeywords: jobData.metaforms?.[0]?.metaKeywords.map((item) => item.text),
                    link: jobData.metaforms?.[0]?.link
                })
            }
            catch (error) {
                console.error("Get Job By ID API Error", error)
            }
        }
        if (id) fetchData();
    }, [id, reset])


    const dispatch = useDispatch();
    const selectedQuestions = watch("selectedQuestions");

    const onSubmit = async (data) => {
        const formData = {
            title: data.title,
            slug: data.slug,
            positions: Number(data.positions),
            shortDescription: data.shortDescription,
            description: data.description,
            department: data.department,
            type: data.type,
            gender: data.gender,
            careerLevel: data.careerLevel,
            skills: data.selectedSkills,
            customQuestions: data.selectedQuestions,
            metaforms: [
                {
                    metatitle: data.metatitle,
                    metedescription: data.metedescription,
                    link: data.link,
                    metaKeywords: data.metaKeywords,
                },
            ],
        };
        dispatch(updateJobs({ id, formData })).unwrap()
            .then(() => {
                alert("Job updated Created Successfully")
            })
            .catch((error) => {
                console.error("Error Updating Job", error)
            })
    };

    const { departments } = useSelector((state) => state.departments);
    useEffect(() => {
        dispatch(fetchdepartment());
    }, [dispatch]);

    const { skills } = useSelector((state) => state.skills);
    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);

    const { qustions = [] } = useSelector((state) => state.qustions);
    useEffect(() => {
        dispatch(fetchqustion());
    }, [dispatch]);

    const selectedSkills = watch("selectedSkills", []);

    const handleSelectSkill = (skillName) => {
        setValue("selectedSkills", [...selectedSkills, skillName]);
    };

    const handleRemoveSkill = (skillName) => {
        setValue(
            "selectedSkills",
            selectedSkills.filter((skill) => skill !== skillName)
        );
    };

    const metaKeywords = watch("metaKeywords");
    const handleKeywordsChange = (e) => {
        const value = e.target.value;
        const keywordsArray = value
            .split(",")
            .map((word) => word.trim())
            .filter((word) => word !== "");
        setValue("metaKeywords", keywordsArray, { shouldValidate: true });
    };


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
        <section className="mt-16">
            <header className="w-full h-12  flex justify-between items-center py-3 mt-16 border-b">
                <div className="pl-2">
                    <h1 className="text-2xl">Edit Job</h1>
                </div>

                <div className='flex justify-evenly items-center gap-2'>
                    <Link href="#" className='flex justify-center items-center ring-1 rounded-sm ring-black px-4 py-1'>
                        <ArrowLeft />
                        <p>Back</p>
                    </Link>
                    <Button type="submit" form="jobForm" className='flex justify-center items-center gap-2 rounded bg-black text-white px-4 py-1'>
                        <Save />
                        <p>Save</p>
                    </Button>
                </div>
            </header >
            <main>
                <form onSubmit={handleSubmit(onSubmit)} id='jobForm' className="mt-6 space-y-4">
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
                            {/* <Label>Description</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Editor value={field.value} onChange={field.onChange} />
                                )}
                            /> */}
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
                                            options={departments.map((dept) => ({
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
                                    <Input type="text" placeholder="search.." />
                                    <ScrollArea className="h-56 w-44 rounded-md border">
                                        {Array.isArray(skills) && skills.length > 0 ? (
                                            skills
                                                .filter(
                                                    (skill) => !selectedSkills.includes(skill.skillname)
                                                )
                                                .map((skill) => (
                                                    <div
                                                        key={skill.id}
                                                        className="capitalize px-4 cursor-pointer"
                                                        onClick={() => handleSelectSkill(skill.skillname)}
                                                    >
                                                        {skill.skillname}
                                                        <Separator />
                                                    </div>
                                                ))
                                        ) : (
                                            <p className="text-gray-500 text-center">Loading...</p>
                                        )}
                                    </ScrollArea>
                                </div>

                                <div className="space-y-2">
                                    <Input />
                                    <ScrollArea className="h-56 w-44 rounded-md border">
                                        {(selectedSkills || []).length > 0 ? (
                                            selectedSkills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className=" rounded-md cursor-pointer"
                                                    onClick={() => handleRemoveSkill(skill)}
                                                >
                                                    {skill}
                                                    <Separator />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center">
                                                No skills selected
                                            </p>
                                        )}
                                    </ScrollArea>
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
                                <Link href="/admin/career/questions/create">
                                    <Button> Add Questions</Button>
                                </Link>
                            </div>
                        </div>
                        {qustions.map((que) => (
                            <div key={que.id} className="space-x-2 text-base">
                                <Controller
                                    name="selectedQuestions"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value.includes(que.title)}
                                            onCheckedChange={(checked) => {
                                                field.onChange(
                                                    checked
                                                        ? [...field.value, que.title]
                                                        : field.value.filter((q) => q !== que.title)
                                                );
                                            }}
                                        />
                                    )}
                                />
                                <span>{que.title}</span>
                            </div>
                        ))}
                    </div>

                    {/* Metatags */}
                    <div className="bg-white text-black rounded-sm p-4 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Label>Meta Title</Label>
                            <Input placeholder="Meta Title" {...register("metatitle")} />
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
                            <Input
                                type="text"
                                placeholder="add tag"
                                onChange={handleKeywordsChange}
                                value={(metaKeywords || [])
                                    .map((kw) => (typeof kw === "string" ? kw : kw.keyword || ""))
                                    .join(", ")}
                            />
                        </div>
                        <div className="flex flex-col  gap-2">
                            <Label>Link Canonical</Label>
                            <Input placeholder="Link Canonical" {...register("link")} />
                        </div>
                    </div>
                </form>
            </main>

        </section>
    )
}

export default Editjob