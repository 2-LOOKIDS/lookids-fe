'use client';

import MainHamburger from '../icons/topNavBar/MainHamburger';
import MainTopLogo from '../icons/topNavBar/MainTopLogo';
import NavMenuItem from './NavMenuItem';
import NotificationBellIcon from '../common/NotificationBellIcon';
import { NotificationModal } from '../icons/topNavBar/NotificationModal';
import { Search } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import { useNotification } from '../../hooks/useNotification';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function NavMenus({ onMenuClick }: HeaderProps) {
  const {
    notificationData,
    isModalOpen,
    hasNotification,
    closeModal,
    openModal,
  } = useNotification();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  return (
    <>
      {isSearchBarVisible ? (
        <div className="w-full">
          <SearchBar onClose={() => setIsSearchBarVisible(false)} />
        </div>
      ) : (
        <>
          <ul className="flex items-center gap-x-2">
            <NavMenuItem onClick={onMenuClick}>
              <MainHamburger />
            </NavMenuItem>
            <NavMenuItem>
              <h1 className="text-[0px]">Lookids</h1>
              <MainTopLogo />
            </NavMenuItem>
          </ul>
          <ul className="flex items-center gap-x-2">
            <NavMenuItem>
              <NotificationBellIcon
                hasNotification={hasNotification}
                onClick={openModal}
              />
            </NavMenuItem>
            <NavMenuItem>
              <div onClick={() => setIsSearchBarVisible(true)}>
                <Search color="#ffa200" size={22} />
              </div>
            </NavMenuItem>
          </ul>
          <NotificationModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            notificationData={notificationData}
          />
        </>
      )}
    </>
  );
}
