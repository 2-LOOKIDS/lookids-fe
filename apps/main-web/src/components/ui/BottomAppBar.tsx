import BottomDiaryIcon from "../mainbottom/BottomDiaryIcon";
import BottomHomeIcon from "../mainbottom/BottomHomeIcon";
import BottomMapIcon from "../mainbottom/BottomMapIcon";
import BottomMyPageIcon from "../mainbottom/BottomMyPageIcon";

export default function BottomAppBar() {
  return (
    <ul className="fixed bottom-2 bg-white flex flex-row w-full justify-between px-8">
      <li>
        <BottomHomeIcon />
      </li>
      <li>
        <BottomMapIcon />
      </li>
      <li>
        <BottomDiaryIcon />
      </li>
      <li>
        <BottomMyPageIcon />
      </li>
    </ul>
  );
}
