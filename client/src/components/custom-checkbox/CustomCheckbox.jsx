import "./custom-checkbox.css";
import { Checkbox } from "@mui/material";

const sx = {
  "&.Mui-checked": {
    color: "#c32aa3",
  },
};

const CustomCheckbox = ({ id, checked, label, select, deselect }) => {
  const handleChange = () => (checked ? deselect(id) : select(id));

  return (
    <section className="custom-checkbox">
      <div>{label}</div>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        sx={sx}
      />
    </section>
  );
};

export default CustomCheckbox;
