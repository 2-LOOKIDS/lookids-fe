'use client';

import {
  HomeIcon,
  MapPin,
  MessageCircle,
  PenBoxIcon,
  User,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import PencilWrite from '../lottie/PencilWrite';

export const bottomNavMenuData = [
  {
    name: '홈',
    url: '/',
    icon: HomeIcon,
  },
  {
    name: '지도',
    url: '/map',
    icon: MapPin,
  },
  {
    name: '글쓰기',
    url: '/addfeed',
    icon: PenBoxIcon,
  },
  {
    name: '채팅',
    url: '/chatting',
    icon: MessageCircle,
  },
  {
    name: '마이페이지',
    url: '/mypage',
    icon: User,
  },
];

export default function BottomAppBar() {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <nav className="mx-auto relative pt-2 pb-4">
        <ul className="flex justify-between items-center px-8">
          {bottomNavMenuData.map((menu, index) =>
            menu.name !== '글쓰기' ? (
              <li
                onClick={() => router.push(menu.url)}
                key={index}
                className={`p-3 rounded-full ${currentPath === menu.url ? 'bg-gray-800' : 'bg-gray-100'} transition-all`}
              >
                <menu.icon
                  size={currentPath === menu.url ? 20 : 16}
                  color={currentPath === menu.url ? 'white' : 'gray'}
                />
              </li>
            ) : (
              <li key={index} className={`p-8 rounded-full`}></li>
            )
          )}
        </ul>
        <div
          className="bg-[#fd9340] rounded-full"
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            border: '3px solid #fff',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '-10px',
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <PencilWrite />
        </div>
      </nav>
    </div>
  );
}
