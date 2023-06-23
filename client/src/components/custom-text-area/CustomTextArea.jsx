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
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const textAreaNode = useRef();

  const expand = (e) => {
    const { innerHTML } = e.target;

    const openDiv = new RegExp("<div>", "g");
    const closeDiv = new RegExp("</div>", "g");
    const lineBreak = new RegExp("<br>", "g");
    const blank = /[^&nbsp;\s\n]/;

    // Some browsers such as chrome creates a new div for every new line content while others just use a <br>. Hence, the condition.
    const isChrome = openDiv.test(innerHTML);

    //Browsers like chrome also puts a <br> between a div whenever the newLine is empty.
    const chromeReplace = innerHTML
      .replace(openDiv, "\n")
      .replace(closeDiv, "")
      .replace(lineBreak, "");
    const nonChromeReplace = innerHTML.replace(lineBreak, "\n");

    const modified = isChrome ? chromeReplace : nonChromeReplace;
    // Sometimes the browser decides to treat the first line as a new line.
    setShowPlaceholder(modified === "\n" || !modified ? true : false);

    //This ensures that user cannot make a post without having at least an actual character.
    const containsActualCharacter = blank.test(modified);
    const text = containsActualCharacter ? modified : "";
    setTextContent(text);
    handleInput(text);
  };

  useEffect(() => {
    textAreaNode.current.focus();
  }, []);

  const { ph, ta } = sxx;

  return (
    <>
      {showPlaceholder && (
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
