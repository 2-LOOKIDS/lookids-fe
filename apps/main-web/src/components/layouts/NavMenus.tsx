'use client';
import { useNotification } from '../../hooks/useNotification';
import NotificationBellIcon from '../common/NotificationBellIcon';
import MainHamburger from '../icons/topNavBar/MainHamburger';
import BellTest from '../icons/topNavBar/MainTopBell';
import MainTopLogo from '../icons/topNavBar/MainTopLogo';
import MainTopSearch from '../icons/topNavBar/MainTopSearch';
import { NotificationModal } from '../icons/topNavBar/NotificationModal';
import NavMenuItem from './NavMenuItem';

interface HeaderProps {
  onMenuClick: () => void;
}

function NavMenus({ onMenuClick }: HeaderProps) {
  const {
    notificationData,
    isModalOpen,
    hasNotification,
    handleNotification,
    closeModal,
    openModal,
  } = useNotification();

  return (
    <nav className="flex w-full justify-between">
      <ul className="flex items-center gap-x-2">
        <NavMenuItem onClick={onMenuClick}>
          <MainHamburger />
        </NavMenuItem>
        <NavMenuItem>
          <h1 className="text-[0px]">Lookids</h1>
          <MainTopLogo />
        </NavMenuItem>
      </ul>
      <ul className="flex items-center gap-x-1">
        <NavMenuItem>
          <NotificationBellIcon
            hasNotification={hasNotification}
            onClick={openModal}
          />
        </NavMenuItem>
        <NavMenuItem>
          <MainTopSearch />
        </NavMenuItem>
      </ul>

      <NotificationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        notificationData={notificationData}
      />

      <BellTest onNotification={handleNotification} />
    </nav>
  );
}

export default NavMenus;
