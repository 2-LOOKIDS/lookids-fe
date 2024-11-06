"use client";

import { usePathname, useRouter } from "next/navigation";
import BottomAddIcon from "../mainbottom/BottomAddIcon";
import BottomDiaryIcon from "../mainbottom/BottomDiaryIcon";
import BottomHomeIcon from "../mainbottom/BottomHomeIcon";
import BottomMapIcon from "../mainbottom/BottomMapIcon";
import BottomMyPageIcon from "../mainbottom/BottomMyPageIcon";

export default function BottomAppBar() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="max-w-md mx-auto">
        <ul className="flex justify-around py-4">
          <li>
            <button
              onClick={() => {
                router.push("/");
              }}
              className="flex flex-col items-center"
            >
              <BottomHomeIcon isActive={currentPath === "/"} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push("/map");
              }}
              className="flex flex-col items-center"
            >
              <BottomMapIcon isActive={currentPath === "/map"} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push("/addfeed");
              }}
              className="flex flex-col items-center"
            >
              <BottomAddIcon />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push("/subscribe/test");
              }}
              className="flex flex-col items-center"
            >
              <BottomDiaryIcon isActive={currentPath === "/diary"} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push("/mypage");
              }}
              className="flex flex-col items-center"
            >
              <BottomMyPageIcon isActive={currentPath === "/mypage"} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
