'use client';

import { usePathname, useRouter } from 'next/navigation';

import BottomAddIcon from '../icons/bottomNavBar/BottomAddIcon';
import BottomDiaryIcon from '../icons/bottomNavBar/BottomDiaryIcon';
import BottomHomeIcon from '../icons/bottomNavBar/BottomHomeIcon';
import BottomMapIcon from '../icons/bottomNavBar/BottomMapIcon';
import BottomMyPageIcon from '../icons/bottomNavBar/BottomMyPageIcon';

export default function BottomAppBar() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-[430px] border-t border-gray-200 bg-white">
      <nav className="mx-auto max-w-md">
        <ul className="flex justify-around py-4">
          <li>
            <button
              onClick={() => {
                router.push('/');
              }}
              className="flex flex-col items-center"
            >
              <BottomHomeIcon isActive={currentPath === '/'} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push('/map');
              }}
              className="flex flex-col items-center"
            >
              <BottomMapIcon isActive={currentPath === '/map'} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push('/addfeed');
              }}
              className="flex flex-col items-center"
            >
              <BottomAddIcon />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push('/chatting');
              }}
              className="flex flex-col items-center"
            >
              <BottomDiaryIcon isActive={currentPath === '/chatting'} />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                router.push('/mypage');
              }}
              className="flex flex-col items-center"
            >
              <BottomMyPageIcon isActive={currentPath === '/mypage'} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
