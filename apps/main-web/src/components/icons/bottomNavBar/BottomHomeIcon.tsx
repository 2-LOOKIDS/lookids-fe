import { IconActiveType } from '../../../types/bar/IconActiveType';

export default function BottomHomeIcon({ isActive = false }: IconActiveType) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill={isActive ? '#FD9340' : 'white'} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7295 15.6L18 10L25.2706 15.6V24.4C25.2706 25.2837 24.5472 26 23.6549 26H12.3452C11.4529 26 10.7295 25.2837 10.7295 24.4V15.6Z"
        stroke={isActive ? 'white' : '#AFB2B5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5764 26V18H20.4234V26"
        stroke={isActive ? 'white' : '#AFB2B5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
