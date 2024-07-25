import React, { FC } from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={id}
        className={`form-label ${required ? "required" : ""}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="form-control form-control-solid"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
