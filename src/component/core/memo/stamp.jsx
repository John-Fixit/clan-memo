/* eslint-disable react/prop-types */

import { CiStar } from "react-icons/ci";


const Stamp = ({
  institutionName = "NIGERIA CIVIL",
  department = "REGISTRAR",
  date = "03 DEC 2023",
  address = "AVIATION AUTHORITY",
  logoUrl = "src/assets/images/ncaa_logo.png",
}) => {
  return (
    <div className="relative w-60 h-40 animate-  transform rotate-[-15deg] translate-x-4 translate-y-6">
      <svg
        viewBox="0 0 300 180"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))",
        }}
      >
        {/* Outer ellipse */}
        <ellipse
          cx="150"
          cy="90"
          rx="145"
          ry="85"
          fill="none"
          stroke="#000066"
          strokeWidth="2"
        />

        {/* Inner ellipse */}
        <ellipse
          cx="150"
          cy="90"
          rx="140"
          ry="80"
          fill="none"
          stroke="#000066"
          strokeWidth="1"
        />

        {/* Deep Inner ellipse */}
        <ellipse
          cx="150"
          cy="90"
          rx="100"
          ry="50"
          fill="none"
          stroke="#000066"
          strokeWidth="1"
        />

        {/* Curved text paths */}
        <defs>
          {/* Top curved path for institution name */}
          <path
            id="topCurve"
            d="M 30 70 A 150 85 0 0 1 270 70"
            fill="none"
          />
          {/* Bottom curved path for address */}
          <path
            id="bottomCurve"
            d="M 30 110 A 130 85 0 0 0 270 110"
            fill="none"
          />
        </defs>

        {/* Institution name on curved path */}
        <text fill="#000066" fontSize="20">
          <textPath href="#topCurve" textAnchor="middle" startOffset="50%">
            {institutionName}
          </textPath>
        </text>

        {/* Department text */}
        <text
          x="150"
          y="62"
          textAnchor="middle"
          fontSize="16"
          fontFamily="Arial"
          fill="#000066"
        >
          {department}
        </text>

        {/* Date text */}
        <text
          x="150"
          y="100"
          textAnchor="middle"
          fontSize="20"
          fontFamily="Arial"
          fill="#b91722"
          fontWeight="bold"
        >
          {date}
        </text>

        {/* Address on curved path */}
        <text fill="#000066" fontSize="16">
          <textPath href="#bottomCurve" textAnchor="middle" startOffset="50%">
            {address}
          </textPath>
        </text>

        {/* Circular logo background */}
        <circle
          cx="50"
          cy="90"
          r="25"
          fill="none"
          stroke="#000066"
          strokeWidth="1"
        />

        {/* Logo/Image placeholder with circular clip */}
        <defs>
          <clipPath id="circleClip">
            <circle cx="50" cy="90" r="24" />
          </clipPath>
        </defs>
        <image
          x="26"
          y="66"
          width="48"
          height="48"
          href={logoUrl}
          clipPath="url(#circleClip)"
        />

        {/* Star Icon (React-Icons) */}
        <foreignObject x="250" y="75" width="30" height="30">
          <CiStar
            size={25}
            color="#000066"
            style={{
              display: "block",
              margin: "auto",
            }}
          />
        </foreignObject>
      </svg>
    </div>
  );
};

export default Stamp;
