interface NotificationBellSvgProps {
  hasNotification?: boolean;
}

export default function NotificationBellSvg({
  hasNotification = false,
}: NotificationBellSvgProps) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_55_1662)">
        <ellipse cx="28" cy="28" rx="19.2953" ry="19" fill="white" />
      </g>
      <g clipPath="url(#clip0_55_1662)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23 20C24 18.8 25.5 18 28 18C30.5 18 32 18.8 33 20C34 21.2 34.5 22.5 34.5 24C34.5 26 35 27.5 35.5 28.5C35.7 29 35.9 29.2 36 29.3C36.1 29.4 36.1 29.5 36.2 29.5C36.2 29.5 36.3 29.6 36.3 29.7C36.7 30 36.8 30.7 36.6 31.2C36.5 31.6 36.1 32 35.5 32H20.5C19.9 32 19.5 31.6 19.4 31.2C19.2 30.7 19.4 30 19.7 29.7C19.7 29.6 19.8 29.5 19.8 29.5C19.9 29.5 20 29.4 20.1 29.3C20.2 29.2 20.4 29 20.5 28.5C21 27.5 21.5 26 21.5 24C21.5 22.5 22 21.2 23 20ZM21.5 29H34C33 27.5 32 24.5 32 24C32 22.9 31.6 21.8 30.9 21.1C30.2 20.4 29.1 20 28 20C26.9 20 25.8 20.4 25.1 21.1C24.4 21.8 24 22.9 24 24C24 25.5 23 27.5 21.5 29Z"
          fill="#FD9340"
        />
        <circle cx="28" cy="36" r="2" fill="#4F4F4F" />
      </g>
      {hasNotification && <circle cx="40" cy="16" r="4" fill="red" />}
      <defs>
        <filter
          id="filter0_d_55_1662"
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
            result="effect1_dropShadow_55_1662"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_55_1662"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_55_1662">
          <rect
            width="19"
            height="19.5"
            fill="white"
            transform="translate(20 18)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
