import React, { FC } from "react";

interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Switch: FC<SwitchProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="mb-10">
      <div className="form-check form-switch form-check-custom form-check-solid">
        <input
          className="form-check-input"
          type="checkbox"
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

export default Switch;
