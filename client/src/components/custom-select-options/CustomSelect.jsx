import "./custom-select.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FormRadioOptions from "../form-radio-options/FormRadioOptions";

import { useState } from "react";



export default function CustomSelect({openOptions, options}) {
  
    const [currentOption, setCurrentOption] = useState("Friends")
    
    const handleClick = ()=>{
        openOptions()
    }

    const handleChange = (e)=>{        
        setCurrentOption(e.target.value)
    }   
 
  return (    
    <div className="custom-select-option-container">
        <div className="custom-select" onClick={handleClick} >
            <span className="custom-select-currentValue">
                {currentOption}
            </span>
            <i className="custom-select-expand-icon">
                {options 
                ? <ExpandLessIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                : <ExpandMoreIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                }
            </i>
        </div>
        { options && <FormRadioOptions {...{
          options:["Friends", "Public", "Only me"],
          handleChange,
          currentOption,
          optionsContainerClassName: "custom-options"
          }} />}
    </div>    
  )
}