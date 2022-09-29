import "./report-post.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FormRadioOptions from "../../../components/form-radio-options/FormRadioOptions";
import SimpleHeader from "../../../components/simple-header/SimpleHeader";
import { iconStyle } from "../../../util/iconDescContent";
import { reportOptions } from "../../../util/formRadioOptions";
import {
  closeReportPost,
  setReportValue,
} from "../../../app/actions/homeActions";
import { useDispatch, useSelector } from "react-redux";
import { getReportPostState } from "../post-excerpt/postExcerptSlice";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";

export default function ReportPost() {
  const dispatch = useDispatch();
  const { valueId } = useSelector(getReportPostState);

  const handleClose = () => closePopupOnOpaqueOverlay(closeReportPost);

  return (
    <div className="report-post-container">
      <div className="report-post-wrapper">
        <SimpleHeader
          desc={"Report an issue"}
          closeAction={handleClose}
          overlay={true}
        />
        <div className="report-options-container">
          <FormRadioOptions
            {...{
              options: reportOptions,
              valueId,
              setValue: (valId) => dispatch(setReportValue(valId)),
            }}
          />
        </div>
        <hr className="create-hr" />
        <div className="report-post-bottom">
          <button className="report-cancel report-button" onClick={handleClose}>
            Cancel
          </button>
          <button className="report-submit report-button">Submit</button>
        </div>
      </div>
    </div>
  );
}
