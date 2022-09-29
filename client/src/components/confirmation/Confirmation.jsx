import "./confirmation.css";

const types = { copy: "Successfully copied link to post" };

export default function Confirmation({ type }) {
  return (
    <div className="confirmation-container quote">{types[type] || ""}</div>
  );
}
