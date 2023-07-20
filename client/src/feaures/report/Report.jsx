import "./report.css";
import FormRadioOptions from "../../components/form-radio-options/FormRadioOptions";
import SimpleHeader from "../../components/simple-header/SimpleHeader";
import { reportOptions } from "../../util/formRadioOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  closePopupOnOpaqueOverlay,
  effectConfirmation,
} from "../../util/functions";
import { getReportState } from "../../layout/layoutSlice";
import { useEffect } from "react";
import { closeReport, setReportValue } from "../../app/actions/layoutActions";

export default function Report() {
  const dispatch = useDispatch();
  const { valueId, isReporting, isReported, id } = useSelector(getReportState);

  const handleClose = () => closePopupOnOpaqueOverlay(closeReport);

  // Comes in after report mutation endpoint has been created
  useEffect(() => {
    isReporting && effectConfirmation("report");
    isReported && closePopupOnOpaqueOverlay(closeReport);
  }, [isReported, isReporting]);

  return (
    <div
      className={`report-post-container ${
        isReporting ? "report-transparent" : ""
      }`}
    >
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
