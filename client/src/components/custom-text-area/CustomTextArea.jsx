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

  const textAreaNode = useRef();
  useEffect(() => {
    textAreaNode.current.textContent = textContent;
    handleInput(textContent);
  }, [textContent, handleInput]);

  useEffect(() => {
    textAreaNode.current.focus();
  }, []);

  const { ph, ta } = sxx;
  return (
    <>
      {!textContent && (
        <span className={`custom-placeholder ${ph ? ph : ""}`}>
          {placeholder}
        </span>
      )}

      <div
        ref={textAreaNode}
        className={`custom-textarea ${ta ? ta : ""}`}
        onInput={(e) => {
          setTextContent(e.target.textContent);
        }}
        contentEditable
      />
    </>
  );
}
