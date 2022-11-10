import React from "react";
import "./zoom.css";
import { Slider, Stack } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Zoom = ({ zoomIn, zoomOut, zoom, setZoom, reset, button }) => {
  return (
    <section className="zoom-container">
      <aside>
        <div>
          <Stack spacing={1.5} direction="row" alignItems="center">
            <i onClick={zoomOut}>
              <RemoveCircleOutlineIcon style={{ fontSize: "1.2rem" }} />
            </i>
            <Slider
              sx={{ width: "12rem", color: "#c32aa3" }}
              step={0.1}
              min={0.5}
              max={2}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            />
            <i onClick={zoomIn}>
              <AddCircleOutlineIcon style={{ fontSize: "1.2rem" }} />
            </i>
          </Stack>
        </div>
        <span>{Math.round((zoom - 1) * 100)}%</span>
        <i onClick={reset}>
          <RestartAltIcon />
        </i>
      </aside>
      {button || ""}
    </section>
  );
};

export default Zoom;
