export interface MenuItem {
  label: string;
  onClick: () => void;
}

export interface CommonHeaderProps {
  title: string;
  ismenu: boolean;
  menuItems?: MenuItem[];
}
