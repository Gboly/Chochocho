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
  return (
    <>
      <div
        className="custom-select"
        // onClick={() => dispatch(showVisibilityOptions())}
      >
        <span className={style ? style : ""}>{options[valueId]}</span>
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
              valueId,
              setValue: (valId) => {
                getValue && getValue(valId);
              },
            }}
          />
        </div>
      )}
    </>
  );
}
