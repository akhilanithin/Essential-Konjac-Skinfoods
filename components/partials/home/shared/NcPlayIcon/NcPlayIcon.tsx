import React, { FC } from "react";

export interface NcPlayIconProps {
  className?: React.CSSProperties; // Update to use inline style
}

const NcPlayIcon: FC<NcPlayIconProps> = ({ className = {} }) => {
  const outerStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "50%",
    width: "80px", // w-20
    height: "80px", // h-20
    padding: "12px", // p-3
    position: "relative",
    animation: "pulse 3s infinite linear",
    ...className,
  };

  const innerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "50%",
    color: "#1d4ed8", // text-primary-500
    position: "relative",
  };

  const svgStyle: React.CSSProperties = {
    width: "32px", // w-8
    height: "32px", // h-8
  };

  return (
    <div style={outerStyle} data-nc-id="NcPlayIcon">
      <div style={innerStyle}>
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg
            style={svgStyle}
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NcPlayIcon;
