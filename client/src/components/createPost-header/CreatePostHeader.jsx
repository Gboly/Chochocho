import "./createPost-header.css"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CustomSelect from "../custom-select-options/CustomSelect";
import { useRef } from "react";


export default function CreatePostHeader({openOptions, options, closeCreatePostWithin}) {    

    const handleClick= (e)=>{        
        closeCreatePostWithin(e)
    }

  return (
    <div className="create-top-styled">
        <div className="create-top">
            <span className="create-top-description">
                Create a post
            </span>
            <div className="create-select-section">               
                <label htmlFor="visibleFor" className="create-top-instruction">
                    Visible for
                </label>
                <CustomSelect {...{openOptions, options}} />            
            </div>
            <i id="create-close-icon" className="create-close-icon" onClick={handleClick}>
                <HighlightOffOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
            </i>                
        </div>
        <hr className="create-hr" />
    </div>
  )
}
