import MainHamburger from "../main/MainHamburger";
import BellTest from "../main/MainTopBell";
import MainTopLogo from "../main/MainTopLogo";
import MainTopSearch from "../main/MainTopSearch";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 bg-white left-0 w-full z-10 flex items-center">
      <nav className="flex w-full py-2 px-4 justify-between ">
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
