import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const sx={
    color: "#c32aa3",    
    '&.Mui-checked': {
      color: "#c32aa3",
    },
}
export default function FormRadioOptions({options, currentOption, handleChange, optionsContainerClassName}) {
  return (
    <div className={optionsContainerClassName}>
            <div className="custom-options-item">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="controlled-radio-buttons-group"
                value={currentOption}
                onChange={handleChange}
              >
                { options.map((option, index)=>{
                    return (<FormControlLabel
                    value={option}
                    control={<Radio size="small" sx={currentOption===option ? sx : {}} />} 
                    label={option}
                    key={index} />)
                })
                }
              </RadioGroup>
            </FormControl>
            </div>
        </div>
  )
}
