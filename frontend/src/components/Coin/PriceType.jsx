import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PriceType({ priceType, handlePriceTypeChange }) {
  return (
    <div className="flex justify-center items-center mb-6">
      <ToggleButtonGroup
        value={priceType}
        exclusive
        onChange={(e)=>handlePriceTypeChange(e)}
        sx={{
          "&.Mui-selected": {
            color: "white !important",
          },
          borderColor: "#8b5cf6",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid #8b5cf6!important",
            borderColor: "unset",
            color: "#8b5cf6 !important ",
          },
          "& .MuiToggleButton-standard": {
            color: "white !important",
          },
        }}
      >
        <ToggleButton value="prices">Price</ToggleButton>
        <ToggleButton value="market_caps">Market Cap</ToggleButton>
        <ToggleButton value="total_volumes">Total Volume</ToggleButton>
      </ToggleButtonGroup> 
    </div>
  );
}