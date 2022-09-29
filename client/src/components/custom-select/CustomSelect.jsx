import "./custom-select.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FormRadioOptions from "../form-radio-options/FormRadioOptions";
import { iconStyle } from "../../util/iconDescContent";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { showVisibilityOptions } from "../../app/actions/homeActions";

export default function CustomSelect({
  options,
  valueId,
  getValue,
  isOpen,
  style,
}) {
  const [VisibilityFor, setVisibilityFor] = useState(valueId);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="custom-select"
        // onClick={() => dispatch(showVisibilityOptions())}
      >
        <span className={style ? style : ""}>{options[VisibilityFor]}</span>
        <i className="custom-select-expand-icon">
          {isOpen ? (
            <ExpandLessIcon style={iconStyle} />
          ) : (
            <ExpandMoreIcon style={iconStyle} />
          )}
        </i>
      </div>

      {isOpen && (
        <div className="custom-options">
          <FormRadioOptions
            {...{
              options,
              valueId: VisibilityFor,
              setValue: (valId) => {
                setVisibilityFor(valId);
                getValue && getValue(valId);
              },
            }}
          />
        </div>
      )}
    </>
  );
}
