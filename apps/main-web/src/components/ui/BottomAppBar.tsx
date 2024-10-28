import BottomDiaryIcon from "../mainbottom/BottomDiaryIcon";
import BottomHomeIcon from "../mainbottom/BottomHomeIcon";
import BottomMapIcon from "../mainbottom/BottomMapIcon";
import BottomMyPageIcon from "../mainbottom/BottomMyPageIcon";

export default function BottomAppBar() {
  return (
    <ul className="fixed bottom-0 bg-white flex flex-row w-full justify-between py-4 px-8">
      <li className="flex-1 flex justify-center">
        <BottomHomeIcon />
      </li>
      <li className="flex-1 flex justify-center border-l border-gray-200">
        <BottomMapIcon />
      </li>
      <li className="flex-1 flex justify-center border-l border-gray-200">
        <BottomDiaryIcon />
      </li>
      <li className="flex-1 flex justify-center border-l border-gray-200">
        <button>
          <BottomMyPageIcon />
        </button>
      </li>
    </ul>
  );
}
