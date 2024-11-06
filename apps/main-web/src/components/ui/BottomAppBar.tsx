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
    <ul className="fixed bottom-0 bg-white flex flex-row w-full justify-around py-4 ">
      <li className="flex-1 flex justify-center">
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          <BottomHomeIcon isActive={currentPath === "/"} />
        </button>
      </li>
      <li className="flex-1 flex justify-center border-l border-gray-200">
        <button
          onClick={() => {
            router.push("/map");
          }}
        >
          <BottomMapIcon isActive={currentPath == "/map"} />
        </button>
      </li>

      <li className="flex-1 flex justify-center border-l border-gray-200">
        <button
          onClick={() => {
            router.push("/addfeed");
          }}
        >
          <BottomAddIcon />
        </button>
      </li>
      <li className="flex-1 flex justify-center border-l border-gray-200">
        <button
          onClick={() => {
            router.push("/subscribe/test");
          }}
        >
          <BottomDiaryIcon isActive={currentPath == "/diary"} />
        </button>
      </li>
      <li className="flex-1 flex justify-center border-l border-gray-200">
        <button
          onClick={() => {
            router.push("/mypage");
          }}
        >
          <BottomMyPageIcon isActive={currentPath == "/mypage"} />
        </button>
      </li>
    </ul>
  );
}

//refresh Token 한달
//
