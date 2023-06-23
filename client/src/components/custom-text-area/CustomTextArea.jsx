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

  const expand = (e) => {
    const { innerHTML } = e.target;

    const openDiv = new RegExp("<div>", "g");
    const closeDiv = new RegExp("</div>", "g");
    const lineBreak = new RegExp("<br>", "g");

    // Some browsers such as chrome creates a new div for every new line content while others just use a <br>. Hence, the condition.
    const isChrome = openDiv.test(innerHTML);

    //Browsers like chrome also puts a <br> between a div whenever the newLine is empty.
    const chromeReplace = innerHTML
      .replace(openDiv, "\n")
      .replace(closeDiv, "")
      .replace(lineBreak, "");
    const nonChromeReplace = innerHTML.replace(lineBreak, "\n");

    const result = innerHTML
      ? isChrome
        ? chromeReplace
        : nonChromeReplace
      : "";
    setTextContent(result);
    handleInput(result);
  };

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
          expand(e);
        }}
        contentEditable
      />
    </>
  );
}
