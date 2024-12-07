import { useNotification } from '../../hooks/useNotification';
import MainHamburger from '../icons/topNavBar/MainHamburger';
import MainTopLogo from '../icons/topNavBar/MainTopLogo';
import MainTopSearch from '../icons/topNavBar/MainTopSearch';
import NavMenuItem from './NavMenuItem';

interface HeaderProps {
  onMenuClick: () => void;
}

function NavMenus({ onMenuClick }: HeaderProps) {
  const { isModalOpen, hasNotification, openModal, closeModal, notifications } =
    useNotification();

  return (
    <nav className="flex w-full justify-between">
      <ul className="flex items-center gap-x-2">
        <NavMenuItem onClick={onMenuClick}>
          <MainHamburger />
        </NavMenuItem>
        <NavMenuItem>
          <MainTopLogo />
        </NavMenuItem>
      </ul>
      <ul className="flex items-center gap-x-1">
        {/* <NavMenuItem onClick={openModal}>
          <NotificationBellIcon
            hasNotification={hasNotification}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </NavMenuItem> */}
        <NavMenuItem>
          <MainTopSearch />
        </NavMenuItem>
      </ul>

      {/* <NotificationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        notifications={notifications}
      /> */}
    </nav>
  );
}

export default NavMenus;
