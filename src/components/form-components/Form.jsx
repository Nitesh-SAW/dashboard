// "use client"
// import React, { useEffect, useState } from "react";
// import { useFormContext, Controller, useFieldArray } from "react-hook-form";
// import { Input } from "../ui/input";




// const DynamicForm = ({ imageId, schema, name }) => {
//   const { control, setValue, getValues, watch } = useFormContext();
//   const [filePreviews, setFilePreviews] = useState({});

//   useEffect(() => {
//     const currentData = getValues("component") || {};

//     if (!currentData[name]) {
//       currentData[name] = [];
//     }

//     // Pehle se data exist karta hai ya nahi check karo
//     if (currentData[name][imageId] && Object.keys(currentData[name][imageId]).length > 0) {
//       return; // Agar pehle se valid data hai to `setValue` mat chalao
//     }

//     // Valid values ke bina setValue mat chalao
//     // const newData = schema.reduce((acc, field) => {
//     //   acc[field.name] = field.value || "";
//     //   return acc;
//     // }, {});

//     const newData = schema.reduce((acc, field) => {
//       acc[field.name] = field.type === "file" ? null : field.value || "";
//       return acc;
//     }, {});

//     setValue("component", {
//       ...currentData,
//       [name]: [...currentData[name], newData], // Sirf ek naya valid object add karo
//     });
//   }, [name, imageId, schema, setValue, getValues]);

//   const handleFileChange = (event, fieldName) => {
//     const file = event.target.files[0];
//     if (file) {
//       setValue(`component.${name}.${imageId}.${fieldName}`, file); // Save file
//       setFilePreviews((prev) => ({
//         ...prev,
//         [fieldName]: URL.createObjectURL(file), // Show preview
//       }));
//     } else {
//       setValue(`component.${name}.${imageId}.${fieldName}`, null);
//       setFilePreviews((prev) => {
//         const newPreviews = { ...prev };
//         delete newPreviews[fieldName];
//         return newPreviews;
//       });
//     }
//   };

//   return (
//     <div className="w-full p-2 border rounded-md grid grid-cols-2 md:grid-cols-3 gap-2">
//       {schema.map((field, index) => (
//         <div key={index} className="mb-3">
//           {/* <label className="block font-medium mb-1">{field.name}:</label> */}
//           <Controller
//             name={`component.${name}.${imageId}.${field.name}`} // Ensure unique field names
//             control={control}
//             defaultValue={field.value || ""}
//             render={({ field: { value, onChange } }) => (
//               field.type === "file" ? (
//                 <>
//                   <Input
//                     type="file"
//                     onChange={(e) => handleFileChange(e, field.name)}
//                     className="w-full p-2 border rounded"
//                   />
//                   {filePreviews[field.name] && (
//                     <img src={filePreviews[field.name]} alt="Preview" width="100" />
//                   )}
//                 </>
//               ) : (
//                 <Input
//                   type="text"
//                   {...{ value, onChange }}
//                   className="w-full p-2 border rounded"
//                   placeholder={`Enter ${field.name}`}
//                 />
//               )
//             )}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DynamicForm



"use client";
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";

const DynamicForm = ({ imageId, schema, name }) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    const currentData = getValues("component") || {};

    if (!currentData[name]) {
      currentData[name] = [];
    }

    // ✅ Prevent overwriting API data
    if (currentData[name][imageId] && Object.keys(currentData[name][imageId]).length > 0) {
      return;
    }

    const newData = schema.reduce((acc, field) => {
      acc[field.name] = field.type === "file" ? null : field.value || "";
      return acc;
    }, {});

    setValue("component", {
      ...currentData,
      [name]: [...currentData[name], newData],
    });
  }, [name, imageId, schema, setValue, getValues]);

  const formData = watch("component") || {}; // ✅ Ensure reactivity
  const currentValues = formData[name]?.[imageId] || {};

  if (!Object.keys(currentValues).length) return <p>Loading...</p>;

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setValue(`component.${name}.${imageId}.${fieldName}`, file);
      setFilePreviews((prev) => ({
        ...prev,
        [fieldName]: URL.createObjectURL(file),
      }));
    } else {
      setValue(`component.${name}.${imageId}.${fieldName}`, null);
      setFilePreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[fieldName];
        return newPreviews;
      });
    }
  };

  return (
    <div className="w-full p-2 border rounded-md grid grid-cols-2 md:grid-cols-3 gap-2">
      {schema.map((field, index) => (
        <div key={index} className="mb-3">
          <Controller
            name={`component.${name}.${imageId}.${field.name}`}
            control={control}
            render={({ field: { value, onChange } }) => (
              field.type === "file" ? (
                <>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, field.name)}
                    className="w-full p-2 border rounded"
                  />
                  {filePreviews[field.name] && (
                    <img src={filePreviews[field.name]} alt="Preview" width="100" />
                  )}
                </>
              ) : (
                <Input
                  type="text"
                  value={currentValues[field.name] || ""}
                  onChange={onChange}
                  className="w-full p-2 border rounded"
                  placeholder={`Enter ${field.name}`}
                />
              )
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;




// "use client";
// import React, { useEffect, useState } from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { Input } from "../ui/input";

// const DynamicForm = ({ imageId, schema, name }) => {
//   const { control, setValue, getValues, watch } = useFormContext();
//   const [filePreviews, setFilePreviews] = useState({}); // Store file previews

//   useEffect(() => {
//     const currentData = getValues("component") || {};

//     if (!currentData[name]) {
//       currentData[name] = [];
//     }

//     if (currentData[name][imageId] && Object.keys(currentData[name][imageId]).length > 0) {
//       return;
//     }

//     const newData = schema.reduce((acc, field) => {
//       acc[field.name] = field.type === "file" ? null : field.value || "";
//       return acc;
//     }, {});

//     setValue("component", {
//       ...currentData,
//       [name]: [...currentData[name], newData],
//     });
//   }, [name, imageId, schema, setValue, getValues]);

//   const handleFileChange = (event, fieldName) => {
//     const file = event.target.files[0];
//     if (file) {
//       setValue(`component.${name}.${imageId}.${fieldName}`, file); // Save file
//       setFilePreviews((prev) => ({
//         ...prev,
//         [fieldName]: URL.createObjectURL(file), // Show preview
//       }));
//     }
//   };

//   return (
//     <div className="w-full p-2 space-y-2 border rounded-md">
//       {schema.map((field, index) => (
//         <div key={index} className="mb-3">
//           <label className="block font-medium mb-1">{field.name}:</label>
//           <Controller
//             name={`component.${name}.${imageId}.${field.name}`}
//             control={control}
//             defaultValue={field.type === "file" ? null : field.value || ""}
//             render={({ field: { value, onChange } }) => (
//               field.type === "file" ? (
//                 <>
//                   <input
//                     type="file"
//                     onChange={(e) => handleFileChange(e, field.name)}
//                     className="w-full p-2 border rounded"
//                   />
//                   {filePreviews[field.name] && (
//                     <img src={filePreviews[field.name]} alt="Preview" width="100" />
//                   )}
//                 </>
//               ) : (
//                 <Input
//                   type="text"
//                   {...{ value, onChange }}
//                   className="w-full p-2 border rounded"
//                   placeholder={`Enter ${field.name}`}
//                 />
//               )
//             )}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DynamicForm;