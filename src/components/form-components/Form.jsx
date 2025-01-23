"use client";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFormConfig } from "@/lib/features/formSlice";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DynamicForm = ({ imageId, pageName }) => {
  const dispatch = useDispatch();

  // Get form schema and config from Redux store
  const formSchema = useSelector((state) => state.form.formSchema[imageId]);
  const formConfig = useSelector((state) => state.form.formConfig[imageId]) || {};

  // Get page ID based on selected page name from Redux
  const pageId = useSelector((state) =>
    state.Filter.selectedItems.find((page) => page.name === pageName)?.id
  );

  if (!formSchema || formSchema.length === 0) {
    return <p className="p-2">Form not found</p>;
  }

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formSchema.reduce((acc, field) => {
      acc[field.name] = formConfig[field.name] || "";
      return acc;
    }, {}),
  });

  // Submit Handler
  const onSubmit = async (data) => {
    dispatch(setFormConfig({ imageId, config: data }));

    const componentData = {
      componentType: "Findoutour", // Adjust component type as needed
      data: { page_id: pageId, ...data },  // Include page ID here
    };

    try {
      const response = await fetch("http://localhost:3005/api/create-page-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(componentData),
      });

      if (response.ok) {
        console.log("Component saved successfully");
      } else {
        console.error("Failed to save component");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-2 space-y-1">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {formSchema.map((field) => (
          <div key={field.name} className="flex flex-col">
            <Input
              type={field.type}
              placeholder={field.name}
              {...register(field.name, { required: field.required ? `${field.name} is required` : false })}
              className={`rounded max-w-sm focus:border-none ${errors[field.name] ? "border-red-500 focus:ring-red-500" : ""}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="secondary" type="submit" className="rounded p-2 bg-green-400 hover:bg-green-400">
          Save
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
