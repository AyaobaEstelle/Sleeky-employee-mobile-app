import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "react-native-date-picker";

const CustomeDatePicker = ({
  date,
  style,
  onChange,
}: {
  date: string;
  style?: any;
  onChange: (date: string) => void;
}) => {
  const [formatedDate, setFormatedDate] = useState<Date>(new Date(date));

  useEffect(() => setFormatedDate(new Date(date)), [date]);
  return (
    <>
      {Platform.OS?.toLowerCase() === "web" ? (
        <>
          <input
            type="date"
            value={date}
            style={style}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </>
      ) : (
        <DateTimePicker
          date={formatedDate}
          onDateChange={(date: Date) => onChange(date?.toString())}
          style={style}
        />
      )}
    </>
  );
};

export default CustomeDatePicker;
