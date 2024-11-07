export default function MainHamburger() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56" // viewBox를 56x56으로 조정
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_18_14)">
        <ellipse cx="28" cy="28" rx="19.2953" ry="19" fill="#FD9340" />{" "}
        {/* 위치 및 크기 조정 */}
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 28H35H21Z"
        fill="#FD9340"
      />
      <path
        d="M21 28H35"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 22H35H21Z"
        fill="#FD9340"
      />
      <path
        d="M21 22H35"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 34H35H21Z"
        fill="#FD9340"
      />
      <path
        d="M21 34H35"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_18_14"
          x="0"
          y="0"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18_14"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18_14"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
