import React from "react";
import { useState } from "react";

const TooltipApp = () => {
  return (
    <div className="tooltip__container">
      <Tooltip
        info={"Your order will be placed LEFT after the payment"}
        position="left"
      >
        <button type="button" className="btn">
          Left
        </button>
      </Tooltip>
      <Tooltip
        info={"Your order will be placed after the payment"}
        position="top"
      >
        <button type="button" className="btn">
          Top
        </button>
      </Tooltip>
      <Tooltip
        info={"Your order will be placed BOTTOM after the payment"}
        position="bottom"
      >
        <button type="button" className="btn">
          Bottom
        </button>
      </Tooltip>
      <Tooltip
        info={"Your order will be placed RIGHT after the payment"}
        position="right"
      >
        <button type="button" className="btn">
          Right
        </button>
      </Tooltip>
    </div>
  );
};

const Tooltip = ({ info, children, position = "top" }) => {
  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="tooltip__box"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      <div
        className={`tooltip__info tooltip__info--${position} 
          ${showTooltip ? "tooltip__info--open" : ""} 
          ${showTooltip ? `tooltip__info--open-${position}` : ""}`}
      >
        {info}
        {/* Arrow indicator */}
        <div className={`arrow arrow--${position}`}></div>
      </div>
    </div>
  );
};

export default TooltipApp;
