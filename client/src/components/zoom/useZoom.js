import React from "react";

const useZoom = () => {
  const [zoom, setZoom] = React.useState(1);

  const zoomIn = () => zoom < 2 && setZoom((prev) => prev + 0.1);
  const zoomOut = () => zoom > 0.5 && setZoom((prev) => prev - 0.1);

  const reset = () => setZoom(1);

  return { zoomIn, zoomOut, zoom, setZoom: (value) => setZoom(value), reset };
};

export default useZoom;
