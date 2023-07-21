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
import { useEffect, useMemo } from "react";
import { closeReport, setReportValue } from "../../app/actions/layoutActions";
import { useReportUserMutation } from "../../app/api-slices/usersApiSlice";
import { selectPostById } from "../../app/api-slices/postsApiSlice";
import { useGetStoryByIdQuery } from "../../app/api-slices/storiesApiSlice";
import { getCurrentPageState } from "../../routes/routerSlice";

export default function Report() {
  const dispatch = useDispatch();
  const [report, { error }] = useReportUserMutation();
  const { valueId, isReporting, isReported, id } = useSelector(getReportState);
  const { isStoryPage } = useSelector(getCurrentPageState);

  const post = useSelector((state) => selectPostById(state, id));
  const { data: story } = useGetStoryByIdQuery(id, { skip: !isStoryPage });

  const handleClose = () => closePopupOnOpaqueOverlay(closeReport);

  const { type, userId } = useMemo(() => {
    return isStoryPage
      ? {
          type: "story",
          userId: story?.userId,
        }
      : {
          type: "post",
          userId: post?.userId,
        };
  }, [isStoryPage, story, post]);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    const args = {
      userId,
      [`${type}Id`]: id,
      report: reportOptions[valueId],
      type,
      date: new Date().toISOString(),
    };

    valueId && userId && report(args);
  };

  useEffect(() => {
    isReporting && effectConfirmation("report");
    isReported && closePopupOnOpaqueOverlay(closeReport);
  }, [isReported, isReporting]);

  return (
    <form
      className={`report-post-container ${
        isReporting ? "report-transparent" : ""
      }`}
      onSubmit={handleSubmit}
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
          <button className="report-submit report-button" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
