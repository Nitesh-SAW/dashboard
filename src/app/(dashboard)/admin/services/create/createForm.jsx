'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreateForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section>
            <div className='flex flex-col'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label>Service Name</Label>
                    <input {...register('Service Name')} placeholder="Enter your name" />
                    <Label>Slug</Label>
                    <input {...register('name')} placeholder="Enter your name" />
                    <Label>Parent</Label>
                    <input {...register('name')} placeholder="Enter your name" />
                    <Label>Image</Label>
                    <input {...register('name')} placeholder="Enter your name" />
                    <Label>Sort Order</Label>
                    <input {...register('name')} placeholder="Enter your name" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default CreateForm;
