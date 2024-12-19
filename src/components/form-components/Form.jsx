'use client'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormConfig } from '@/lib/features/formSlice';
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from '@radix-ui/react-dropdown-menu';

const DynamicForm = ({ imageId }) => {
    const dispatch = useDispatch();

    // Get form schema and config from Redux store
    const formSchema = useSelector((state) => state.form.formSchema[imageId]);
    const formConfig = useSelector((state) => state.form.formConfig[imageId]) || {};

    // Return early if formSchema is not available
    if (!formSchema || formSchema.length === 0) {
        return <p className='p-2'>Form not found</p>;
    }

    // Initialize form with values from formConfig or default to empty string
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formSchema.reduce((acc, field) => {
            acc[field.name] = formConfig[field.name] || ''; // Ensure there's always a value
            return acc;
        }, {}),
    });

    const onSubmit = (data) => {

        dispatch(setFormConfig({ imageId, config: data }));
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full p-2 space-y-1'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                    {formSchema.map((field) => (
                        <div key={field.name} className='flex flex-col'>
                            {/* <Label>{field.label}</Label> */}
                            <Input
                                type={field.type}
                                placeholder={`${field.name}`}
                                {...register(field.name, { required: field.required ? `${field.name} is required` : false })}
                                className={`rounded max-w-sm focus:border-none ${errors[field.name] ? "border-red-500 focus:ring-red-500" : ""}`}
                            />
                        </div>
                    ))}
                </div>
                <div className='mt-4 flex justify-center'>
                    <Button
                        variant="secondary"
                        type="submit"
                        className="rounded p-2 bg-green-400 hover:bg-green-400"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
};

export default DynamicForm;
