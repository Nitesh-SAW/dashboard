import React, { memo, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Adjust the import path

const MemoizedSelectItem = memo(({ value, label, itemClassName }) => (
    <SelectItem value={value} className={itemClassName}>
        {label}
    </SelectItem>
));

const DynamicSelect = ({
    options,
    onChange,
    placeholder,
    value,
    className,
    itemClassName,
    inputType,
    inputPlaceholder,
    searchQuery,
    setSearchQuery,
}) => {
    const searchInputRef = useRef(null);

    // Input change handle karne ke liye function
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);

        // Ensure input remains focused
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // Filtered options (search ke basis par)
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder}>
                    {value || placeholder}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {/* Search Input */}
                <div className="p-2">
                    <Input
                        ref={searchInputRef} // Attach ref to input
                        type={inputType}
                        placeholder={inputPlaceholder}
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Filtered Options */}
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <MemoizedSelectItem
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            itemClassName={itemClassName}
                        />
                    ))
                ) : (
                    <div className="p-2 text-gray-500">No options found</div>
                )}
            </SelectContent>
        </Select>
    );
};

export default DynamicSelect;
