import { IconActiveType } from '../../types/bar/IconActiveType';

export default function BottomMapIcon({ isActive = false }: IconActiveType) {
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
        d="M25.8571 16.1818C25.8571 22.5455 18 28 18 28C18 28 10.1428 22.5455 10.1428 16.1818C10.1428 11.6631 13.6606 8 18 8C22.3393 8 25.8571 11.6631 25.8571 16.1818V16.1818Z"
        stroke={isActive ? 'white' : '#AFB2B5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="18.0002"
        cy="16.1818"
        rx="2.61905"
        ry="2.72727"
        stroke={isActive ? 'white' : '#AFB2B5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
