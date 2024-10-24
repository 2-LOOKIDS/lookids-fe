import MainHamburger from "./MainHamburger";
import BellTest from "./MainTopBell";
import MainTopLogo from "./MainTopLogo";
import MainTopSearch from "./MainTopSearch";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 bg-white left-0  w-full z-10 h-[56px] flex items-center">
      <ul className="flex w-full justify-between ">
        <li className="flex flex-row items-center ">
          <MainHamburger />
          <MainTopLogo />
        </li>
        <li className="flex flex-row">
          <BellTest />
          <MainTopSearch />
        </li>
      </ul>
    </header>
  );
}
