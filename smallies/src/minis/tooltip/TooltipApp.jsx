import React from "react";
import { useState } from "react";

const TooltipApp = () => {
  return (
    <div className="tooltip__container">
      <Tooltip info={"Yoir rder will be placed after the payment"}>
        <button type="button" className="btn">
          Pay Now
        </button>
      </Tooltip>
    </div>
  );
};

const Tooltip = ({ info, children }) => {
  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="tooltip__box"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      <div className={`tooltip__info ${showTooltip && "tooltip__info--open"}`}>
        {info}
        {/* Arrow indicator */}
        <div className="arrow"></div>
      </div>
    </div>
  );
};
export default TooltipApp;
