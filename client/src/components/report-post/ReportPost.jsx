import "./report-post.css"
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import FormRadioOptions from "../form-radio-options/FormRadioOptions";
import { useState } from "react";

export default function ReportPost({closeReportPost}) {
    const [currentOption, setCurrentOption] = useState("")

    const handleChange = (e)=>{
        setCurrentOption(e.target.value)
        console.log(e.target.value)
    }
  return (
    <div className="report-post-container">
        <div className="report-post-wrapper">            
            <div className="create-top">
                <span className="create-top-description">
                    Report an issue
                </span>                   
                <i id="create-close-icon" className="create-close-icon" onClick={closeReportPost} >
                    <HighlightOffOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>                
            </div>
            <hr className="create-hr" />
            <FormRadioOptions {...{
                options: 
                ["It's spam", 
                "Nudity or sexual activity", 
                "False information",
                "Harassment or hateful speech",
                "It's abusive or harmful",
                "Sale of illegal or regulated goods",
                "intellectual property infringement or defamation",
                "Violence or physical harm"],
                currentOption,
                handleChange,
                optionsContainerClassName: "report-options-container"
            }} />
            <hr className="create-hr" />
            <div className="report-post-bottom">
                <button className="report-cancel report-button" onClick={closeReportPost}>
                    Cancel
                </button>
                <button className="report-submit report-button">
                    Submit
                </button>
            </div>
        </div>
    </div>
    
  )
}
