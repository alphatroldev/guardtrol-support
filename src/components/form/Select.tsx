import React, { FC } from "react";
import Select from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (selectedOption: any) => void;
}

const CustomSelect: FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-10">
      <label className="form-label">{label}</label>
      <div className="input-group flex-nowrap">
        <div className="flex-grow-1">
          <Select
            classNamePrefix="react-select"
            options={options}
            value={value}
            onChange={onChange}
            placeholder="Select an option"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
