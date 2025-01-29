'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CreateForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section className='w-full bg-white mt-3 rounded'>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-1/2 flex flex-col'>
                        <Label>Service Name</Label>
                        <Input {...register('Service Name')} placeholder="Enter your name" />
                        <Label>Slug</Label>
                        <Input {...register('name')} placeholder="Enter your name" />
                        <Label>Parent</Label>
                        <Input {...register('name')} placeholder="Enter your name" />
                        <Label>Image</Label>
                        <Input {...register('name')} placeholder="Enter your name" />
                        <Label>Sort Order</Label>
                        <Input {...register('name')} placeholder="Enter your name" />
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
            <div>
                <Textarea>
                </Textarea>
            </div>
        </section>
    );
};

export default CreateForm;
