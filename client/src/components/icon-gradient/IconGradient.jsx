import "./icon-gradient.css";
import { useState } from "react";
import { notificationIcons } from "../../util/notificationTypes";

export default function IconGradient({ type }) {
  const content = notificationIcons.reduce((accum, current, index) => {
    const { type: iconType, icon } = current;
    if (iconType === type) {
      accum.push(
        <i key={index} className={`notification-icons ${iconType}`}>
          {icon}
        </i>
      );
    }
    return accum;
  }, []);

  return <>{content}</>;
}
