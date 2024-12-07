import React from 'react';

interface NavMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  role?: string;
}

function NavMenuItem({ children, onClick, className, role }: NavMenuItemProps) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      role={role || 'menuitem'}
      tabIndex={0}
    >
      {children}
    </li>
  );
}

export default NavMenuItem;
