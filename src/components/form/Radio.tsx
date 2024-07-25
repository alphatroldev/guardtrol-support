import React, { FC } from "react";

interface RadioProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Radio: FC<RadioProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="mb-10">
      <div className="form-check form-check-custom form-check-solid">
        <input
          className="form-check-input"
          type="radio"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Radio;
