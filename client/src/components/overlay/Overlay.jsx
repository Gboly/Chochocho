import "./overlay.css";
import { useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  getOpaqueOverlayState,
  getTransparentOverlayState,
} from "../../layout/layoutSlice";
import {
  closeNestedPopupOnOpaqueOverlay,
  closePopupOnOpaqueOverlay,
  closePopupOnTransparentOverlay,
} from "../../util/functions";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../../layout/sidebar/Sidebar";
import {
  reportPostType,
  writeAltType,
  sidebarType,
  editProfileImageType,
  selectUsersType,
} from "../../util/types";
import {
  opaqueOverlayComponents,
  TransparentOverlayComponents,
} from "./overlayData";

const nestedPopups = [writeAltType, editProfileImageType, selectUsersType];
const clickExceptions = [reportPostType];

export const TransparentOverlay = () => {
  // To ensure that one component this component takes care of all transparent overlay detail, i'll be using the click position to place the repective popups.
  // Their coordinates are derived from the redux state which was passed on Clicking their trigger(mostly icons).
  const {
    type: currentType,
    x,
    y,
    isBottom,
  } = useSelector(getTransparentOverlayState);

  // These initial positioning is to ensure that the popup is initialized outside the screen and then when the desired dimensions are available, they can be returned.
  const [{ positionX, positionY }, setPosition] = useState({
    positionX: "-100vw",
    positionY: "-100vh",
  });
  // X makes it start from where its clicked when this click position should be just some px before its end
  // subtracting those hard coded values is a personalized design
  const getWidth = useCallback(
    (e) =>
      e &&
      setPosition({
        positionY: isBottom ? y - (e.offsetHeight - 40) : y - 20,
        positionX: x - (e.offsetWidth - 30),
      }),
    [x, y, isBottom]
  );

  const handleClick = (e, closeAction) => {
    if (e.target.getAttribute("id") === "transparent-overlay") {
      return !nestedPopups.includes(currentType) &&
        !clickExceptions.includes(currentType)
        ? closePopupOnTransparentOverlay(closeAction)
        : "";
    }
  };

  const content = TransparentOverlayComponents.reduce(
    (accum, current, index) => {
      const { type, component, closeAction } = current;

      if (type === currentType) {
        accum.push(
          <div
            key={index}
            id="transparent-overlay"
            className="transparent-overlay"
            onClick={(e) => handleClick(e, closeAction)}
          >
            <div
              ref={getWidth}
              style={{
                position: "relative",
                top: positionY,
                left: positionX,
              }}
            >
              {component}
            </div>
          </div>
        );
      }
      return accum;
    },
    []
  );

  return <>{content}</>;
};

export const OpaqueOverlay = () => {
  const { type: currentType, hidden } = useSelector(getOpaqueOverlayState);

  // consider placing this animate presence within the sidebar component itself and you could pass the currentType as rop to it to be used as key
  const opaqueOverlayLibrary = useMemo(() => {
    // #7
    const updatedData = opaqueOverlayComponents.reduce((accum, current) => {
      if (current.type === sidebarType) {
        current.component = (
          <AnimatePresence>
            <Sidebar key={currentType} size="sm" />
          </AnimatePresence>
        );
      }
      accum.push(current);
      return accum;
    }, []);
    return updatedData;
  }, [currentType]);

  const handleClick = (e, closeAction) => {
    if (e.target.getAttribute("id") === "opaque-overlay") {
      return !nestedPopups.includes(currentType) &&
        !clickExceptions.includes(currentType)
        ? closePopupOnOpaqueOverlay(closeAction)
        : "";
    }
  };

  const content = opaqueOverlayLibrary.reduce((accum, current, index) => {
    const { type, component, closeAction } = current;

    if (type === currentType) {
      accum.push(
        <div
          key={index}
          id="opaque-overlay"
          className={`opaque-overlay ${hidden && "bg-overlay"}`}
          onClick={(e) => handleClick(e, closeAction)}
        >
          {component}
        </div>
      );
    }
    return accum;
  }, []);

  return <>{content}</>;
};
