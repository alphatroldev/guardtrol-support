import React, { FC, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

const DatePicker: FC<DatePickerProps> = ({ label, value, onChange }) => {
  const [date, setDate] = useState<Date>(value);

  const handleChange = ([selectedDate]: Date[]) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <div className="mb-10">
      <label className="form-label">{label}</label>
      <Flatpickr
        value={date}
        onChange={handleChange}
        options={{
          enableTime: true,
          dateFormat: "Y-m-d H:i",
        }}
        className="form-control"
        placeholder="Pick date"
      />
    </div>
  );
};

export default DatePicker;
