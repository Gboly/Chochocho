import { useDispatch } from "react-redux";
import "./confirmation.css";
import { useEffect } from "react";
import { closeConfirmation } from "../../app/actions/layoutActions";
import { LinearProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const successTypes = {
  copy: "Successfully copied link to post",
  post: "successfully created post",
  mediaSize: "Media file too large. Upload a file less than 60mb.",
  avatarSize: "Image is too large. Upload an image less than 5mb.",
  report: "Report successfully created",
};
const progressTypes = { post: "Creating post", report: "Reporting user" };
const noCheck = ["mediaSize", "avatarSize"];

export default function Confirmation({ type, progress, message }) {
  const dispatch = useDispatch();

  const Successful = () => {
    useEffect(() => {
      const timeout = setTimeout(() => dispatch(closeConfirmation()), 4000);
      return () => clearTimeout(timeout);
    }, []);

    return (
      <div className="quote confirmation-success">
        {successTypes[type] || message || "what?!"}
        {!noCheck.includes(type) && (
          <span className="success-check">
            <TaskAltIcon color="inherit" />
          </span>
        )}
      </div>
    );
  };

  const Progress = () => {
    return (
      <div className="quote confirmation-progress">
        {progressTypes[type] || ""}
        <div className="progress-wrapper">
          <LinearProgress
            color="inherit"
            variant="determinate"
            value={progress}
          />
        </div>
      </div>
    );
  };

  return progress < 100 ? <Progress /> : <Successful />;
}
