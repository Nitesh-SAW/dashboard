import React, { useState, memo, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
<<<<<<< HEAD
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
=======
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path
import { Value } from "@radix-ui/react-select";
>>>>>>> efe839cb8043bed62574b2dfcc13150a1e93c15f

const DynamicSelect = ({ options, onChange, value, placeholder }) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            className="capitalize"
            value={option.value}
            key={option.id}
          >
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

<<<<<<< HEAD
// const DynamicSelect = ({
//     options,
//     onChange,
//     placeholder,
//     value,
//     className,
//     itemClassName,
//     inputType,
//     inputPlaceholder,
//     searchQuery,
//     setSearchQuery,
// }) => {
//     const searchInputRef = useRef(null);

//     // Input change handle karne ke liye function
//     const handleInputChange = (e) => {
//         setSearchQuery(e.target.value);

//         // Ensure input remains focused
//         if (searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     };

//     // Filtered options (search ke basis par)
//     const filteredOptions = options.filter((option) =>
//         option.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <Select onValueChange={onChange} value={value}>
//             <SelectTrigger className={className}>
//                 <SelectValue placeholder={placeholder}>
//                     {value || placeholder}
//                 </SelectValue>
//             </SelectTrigger>
//             <SelectContent>
//                 {/* Search Input */}
//                 <div className="p-2">
//                     <Input
//                         ref={searchInputRef} // Attach ref to input
//                         type={inputType}
//                         placeholder={inputPlaceholder}
//                         value={searchQuery}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 {/* Filtered Options */}
//                 {filteredOptions.length > 0 ? (
//                     filteredOptions.map((option) => (
//                         <MemoizedSelectItem
//                             key={option.value}
//                             value={option.value}
//                             label={option.label}
//                             itemClassName={itemClassName}
//                         />
//                     ))
//                 ) : (
//                     <div className="p-2 text-gray-500">No options found</div>
//                 )}
//             </SelectContent>
//         </Select>
//     );
// };

// export default DynamicSelect;

const DynamicSelect = ({ options, value, onChange, placeholder }) => {
    // const [selectedValue, setSelectedValue] = useState("")

    // const handleSelect = (value) => {
    //     setSelectedValue(value)
    //     // console.log(selectedValue);
    // }

    return (
        <Select onValueChange={onChange} value={value} >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem value={option.value} key={option.id}>{option.value}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default DynamicSelect
=======
export default DynamicSelect;
>>>>>>> efe839cb8043bed62574b2dfcc13150a1e93c15f
