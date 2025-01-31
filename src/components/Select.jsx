import React, { useState, memo, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path
import { Value } from "@radix-ui/react-select";

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

export default DynamicSelect;
