// components/FormField.tsx
import React from 'react';

/**
 * Props interface for FormField component
 */
interface FormFieldProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  type?: string;
}

//FormField Component
export const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  name,
  value,
  onChange,
  error,
  className = "bg-gray-700 text-white border-0 rounded-md p-2",
  type = "text"
}) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};