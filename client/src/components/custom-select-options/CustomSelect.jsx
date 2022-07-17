import "./custom-select.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";

const sx={
    color: "#c32aa3",
    '&.Mui-checked': {
      color: "#c32aa3",
    },
}

export default function CustomSelect({openOptions, options}) {
  
    const [currentOption, setCurrentOption] = useState("Friends")
       
    const handleChange = (e)=>{
        console.log(e.target)
        setCurrentOption(e.target.value)
    }   
 
  return (    
    <div className="custom-select-option-container">
        <div className="custom-select" onClick={openOptions} >
            <span className="custom-select-currentValue">
                {currentOption}
            </span>
            <i className="custom-select-expand-icon">
                <ExpandMoreIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
            </i>
        </div>
        { options && <div className="custom-options">
            <div className="custom-options-item">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="controlled-radio-buttons-group"
                value={currentOption}
                onChange={handleChange}
              >
                <FormControlLabel 
                value="Friends" 
                control={<Radio size="small" sx={currentOption==="Friends" && sx} />} 
                label="Friends" />
                <FormControlLabel 
                value="Public" 
                control={<Radio size="small" sx={currentOption==="Public" && sx} />} 
                label="Public" />
                <FormControlLabel 
                value="Only me" 
                control={<Radio size="small" sx={currentOption==="Only me" && sx} />} 
                label="Only me" />
              </RadioGroup>
            </FormControl>
            </div>
        </div>}
    </div>    
  )
}