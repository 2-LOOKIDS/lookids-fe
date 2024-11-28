import React from 'react';

function NavMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <li onClick={onClick}>{children}</li>;
}

export default NavMenuItem;
