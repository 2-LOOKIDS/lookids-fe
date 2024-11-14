import MainHamburger from '../icons/topNavBar/MainHamburger';
import BellTest from '../icons/topNavBar/MainTopBell';
import MainTopLogo from '../icons/topNavBar/MainTopLogo';
import MainTopSearch from '../icons/topNavBar/MainTopSearch';

export default function TopNavBar() {
  return (
    <header className="fixed left-0 top-0 z-10 flex w-full items-center bg-white">
      <nav className="flex w-full justify-between px-4 py-2 ">
        <ul className="flex items-center gap-x-2 ">
          <li>
            <MainHamburger />
          </li>
          <li>
            <h1 className="text-[0px]">Lookids</h1>
            <MainTopLogo />
          </li>
        </ul>
        <ul className="flex items-center justify-end gap-x-2">
          <li>
            <BellTest />
          </li>
          <li>
            <MainTopSearch />
          </li>
        </ul>
      </nav>
    </header>
  );
}
