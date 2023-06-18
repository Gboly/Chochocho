import "./custom-text-area.css";
import { useEffect, useRef, useState } from "react";

export default function CustomTextArea({
  placeholder,
  sxx,
  handleInput,
  text,
  content,
}) {
  const [textContent, setTextContent] = useState(content ? content : "");
  const [rows, setRows] = useState(1);

  useEffect(() => {
    handleInput(textContent);
  }, [textContent, handleInput]);

  const expand = (e) => {
    const newLines = e.target.value.match(/\n/gi)?.length || false;
    setRows(newLines ? newLines + 1 : 1);
  };

  const { ta } = sxx;
  return (
    <>
      <textarea
        className={`custom-textarea ${ta ? ta : ""}`}
        onChange={(e) => {
          expand(e);
          setTextContent(e.target.value);
        }}
        value={textContent}
        placeholder={placeholder}
        autoFocus
        rows={rows}
      />
    </>
  );
}
