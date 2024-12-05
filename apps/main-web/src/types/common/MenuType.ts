export interface MenuItem {
  label: string;
  onClick: () => void;
  className?: string;
}

export interface CommonHeaderProps {
  title: string;
  ismenu: boolean;
  menuItems?: MenuItem[];
}
