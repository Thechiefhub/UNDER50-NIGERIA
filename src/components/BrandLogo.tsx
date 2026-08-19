import React from "react";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = "w-48 md:w-56 h-auto" }: BrandLogoProps) {
  return (
    <div className={`select-none flex items-center justify-center ${className}`}>
      <svg
        id="under50-svg-logo"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Luxurious Dark Forest Green Gradient */}
          <linearGradient id="logo-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B4D27" />
            <stop offset="40%" stopColor="#0E6C37" />
            <stop offset="100%" stopColor="#052E17" />
          </linearGradient>

          {/* Elegant Metallic Dark Charcoal Gradient */}
          <linearGradient id="logo-charcoal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#404040" />
            <stop offset="50%" stopColor="#1C1C1C" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>

          {/* Drop shadow for the 'UNDER' label strip cutting across */}
          <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. Stylized Green '5' */}
        <g id="digit-5">
          {/* Top flat horizontal bar */}
          <path
            d="M130 90 H285 V135 H180 V185 L280 186 C290 205 310 240 260 295 C210 350 110 340 100 280 H148 C155 300 200 305 220 285 C240 265 240 230 205 225 H130 V90 Z"
            fill="url(#logo-green-grad)"
          />
        </g>

        {/* 2. Stylized Metallic Black '0' */}
        <g id="digit-0">
          <path
            d="M365 90 C445 90 490 160 490 240 C490 320 445 390 365 390 C285 390 240 320 240 240 C240 160 285 90 365 90 Z M365 135 C325 135 300 175 300 240 C300 305 325 345 365 345 C405 345 430 305 430 240 C430 175 405 135 365 135 Z"
            fill="url(#logo-charcoal-grad)"
          />
        </g>

        {/* 3. Intersecting 'UNDER' White Banner Strip */}
        <g id="under-banner" filter="url(#logo-shadow)">
          {/* High-contrast white horizontal pill strip */}
          <rect
            x="70"
            y="215"
            width="320"
            height="60"
            rx="30"
            fill="#FFFFFF"
          />
          {/* Sharp, clean bold sans-serif text */}
          <text
            x="230"
            y="256"
            fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
            fontSize="38"
            fontWeight="900"
            letterSpacing="2"
            fill="#050505"
            textAnchor="middle"
          >
            UNDER
          </text>
        </g>

        {/* 4. '— NIGERIA —' Sub-heading */}
        <g id="nigeria-label">
          <text
            x="250"
            y="435"
            fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
            fontSize="32"
            fontWeight="800"
            letterSpacing="12"
            fill="#0B4D27"
            textAnchor="middle"
          >
            NIGERIA
          </text>
          
          {/* Symmetric accent geometric lines */}
          <line x1="45" y1="424" x2="115" y2="424" stroke="#0B4D27" strokeWidth="4" />
          <line x1="385" y1="424" x2="455" y2="424" stroke="#0B4D27" strokeWidth="4" />
        </g>

        {/* 5. Minimalist Nigerian Flag Horizontal Bar */}
        <g id="nigeria-flag">
          {/* Flag container bar background */}
          <rect x="200" y="460" width="100" height="12" fill="#FFFFFF" />
          {/* Left green stripe */}
          <rect x="200" y="460" width="33.3" height="12" fill="#0B4D27" />
          {/* Right green stripe */}
          <rect x="266.6" y="460" width="33.4" height="12" fill="#0B4D27" />
        </g>
      </svg>
    </div>
  );
}
