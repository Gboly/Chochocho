import "./write-alt.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useState, useRef } from "react";
import { useEffect } from "react";

export default function WriteAlt({closeCreateAlt, fileUrl, altContainerHeight}) {
    const [altText, setAltText] = useState("")

    const customTextAreaNode = useRef()

    useEffect(()=>{
        customTextAreaNode.current.focus()        
    }, [altContainerHeight])

    const handleInput = (e)=>{
        const value = e.target.textContent
        setAltText(value)
    }

  return (
    <div className="write-alt-container" style={{height:altContainerHeight}}>
        <div className="write-alt-wrapper">
            <div className="write-alt-top">
                <div className="wat-left">
                    <div className="wat-left-icon" onClick={closeCreateAlt}>
                        <ArrowBackOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </div>
                    <span className="wat-left-desc">
                        Write an alt text
                    </span>
                </div>
                <button className="wat-right">
                    Done
                </button>
            </div>
            <div className="write-alt-center">
                <img src={fileUrl} alt="write an alt for post" className="alt-picture" />
            </div>
            <div className="write-alt-bottom">
                {!altText ? <span className="alt-custom-placeholder">
                    Describe this picture...
                </span> : null}
                <div ref={customTextAreaNode}  onInput={handleInput} className="alt-custom-textarea" contentEditable />                
                <span className="alt-character-limit-indicator">
                    {altText.length > 1000
                      ?  <span className="altText-excession">
                            {`-${altText.length-1000}`}
                        </span> 
                      :  `${altText.length}/1000`}
                </span> 
            </div>
        </div>
    </div>
  )
}
