import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";

const sx = {
  color: "#c32aa3",
  "&.Mui-checked": {
    color: "#c32aa3",
  },
};

export default function FormRadioOptions({
  options,
  sxx,
  valueId,
  setValue,
  labelStyle,
  isNonTypoLabel,
}) {
  return (
    <>
      <div className="custom-options-item">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="controlled-radio-buttons-group"
            value={valueId}
            onChange={(e) => {
              setValue && setValue(e.target.value);
            }}
          >
            {options.map((option, index) => {
              return (
                <FormControlLabel
                  value={index}
                  control={
                    <Radio
                      size="small"
                      sx={options[valueId] === option ? sx : {}}
                    />
                  }
                  label={
                    isNonTypoLabel ? (
                      option
                    ) : (
                      <Typography style={labelStyle}>{option}</Typography>
                    )
                  }
                  key={index}
                  sx={sxx}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
}
