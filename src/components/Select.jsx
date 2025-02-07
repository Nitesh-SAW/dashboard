'use client'
import React, { useState, memo, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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



export default DynamicSelect
