import React, { FC } from "react";

export interface NcPlayIcon2Props {
  className?: React.CSSProperties; // Updated to use inline style
  iconClass?: React.CSSProperties; // Updated to use inline style
}

const NcPlayIcon2: FC<NcPlayIcon2Props> = ({
  className = {},
  iconClass = {},
}) => {
  const outerStyle: React.CSSProperties = {
    backgroundColor: "white",
    position: "relative",
    borderRadius: "50%",
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", // shadow-inner
    animation: "pulse 3s infinite linear",
    ...className,
    width: "40px", // Adjust for default size
    height: "40px", // Adjust for default size
  };

  const svgStyle: React.CSSProperties = {
    width: "20px", // Default icon size
    height: "20px", // Default icon size
    color: "#1d4ed8", // text-primary-500
    ...iconClass,
  };

  return (
    <div style={outerStyle} data-nc-id="NcPlayIcon2">
      <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg
          style={svgStyle}
          width="24"
          height="24"
          fill="none" // Set fill to none for stroke-only effect
          viewBox="0 0 24 24"
        >
          <path
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
          />
        </svg>
      </span>
    </div>
  );
};

export default NcPlayIcon2;
