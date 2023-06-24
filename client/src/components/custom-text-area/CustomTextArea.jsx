import "./custom-text-area.css";
import { useEffect, useRef, useState } from "react";

const openDiv = new RegExp("<div>", "g");
const closeDiv = new RegExp("</div>", "g");
const lineBreak = new RegExp("<br>", "g");

const chromeModify = (innerHTML) => {
  const chromeReplace = innerHTML
    .replace(openDiv, "\n")
    .replace(closeDiv, "")
    .replace(lineBreak, "");

  // Since the browser treats an empty default first line as a new line whenever the user creates a new line. Therefore, two new lines (\n\n). This code removes the new line whenever the content starts with \n.
  const chromeResult = chromeReplace.startsWith("\n")
    ? chromeReplace.replace("\n", "")
    : chromeReplace;

  return { chromeReplace, chromeResult };
};

export default function CustomTextArea({
  placeholder,
  sxx,
  handleInput,
  text,
  content,
}) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const textAreaNode = useRef();

  const expand = (e) => {
    const { innerHTML } = e.target;
    const blank = /[^&nbsp;\s\n]/;

    // Some browsers such as chrome creates a new div for every new line content while others just use a <br>. Hence, the condition.
    const isChrome = openDiv.test(innerHTML);

    const { chromeReplace, chromeResult } = chromeModify(innerHTML);
    const modified = isChrome
      ? chromeResult
      : innerHTML.replace(lineBreak, "\n");

    // Sometimes the browser decides to treat the first line as a new line.
    setShowPlaceholder(chromeReplace === "\n" || !modified ? true : false);

    //This ensures that user cannot make a post without having at least an actual character.
    const containsActualCharacter = blank.test(modified);
    const text = containsActualCharacter ? modified : "";
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
