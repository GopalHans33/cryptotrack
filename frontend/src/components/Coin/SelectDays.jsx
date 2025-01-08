import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SelectDays({ days, handleDaysChange, isPTag }) {
  return (
    <div className="text-slate-400 flex justify-start items-center gap-2 m-4">
      {!isPTag && <p>Price Change In </p>}
      <Select
        value={days}
        onChange={handleDaysChange}
        sx={{
          height: "2.5rem",
          color: "#8b5cf6",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e1",
          },
          "& .MuiSvgIcon-root": {
            color: "#cbd5e1",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#8b5cf6",
            },
          },
        }}
      >
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value={60}>60 Days</MenuItem>
        <MenuItem value={90}>90 Days</MenuItem>
        <MenuItem value={120}>120 Days</MenuItem>
        <MenuItem value={365}>1 Year</MenuItem>
      </Select>
    </div>
  );
}