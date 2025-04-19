"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  Icon?: LucideIcon;
}

export default function FormInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  autoComplete,
  placeholder,
  required = true,
  Icon,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold mb-2 flex items-center"
      >
        {Icon && <Icon className="w-4 h-4 mr-2" />} {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#ffde59] focus:border-black"
        placeholder={placeholder}
      />
    </div>
  );
}
