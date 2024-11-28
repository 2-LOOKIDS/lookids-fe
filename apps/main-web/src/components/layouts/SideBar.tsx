import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface FishCategory {
  id: number;
  name: string;
  image: React.FC<{ size?: number }>;
  url: string;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${open ? '' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full transform overflow-hidden p-4 transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          animation: 'gradient-bg 1s infinite',
          background: 'linear-gradient(35deg, #111111, #1f2937)',
          backgroundSize: '200% 300%',
        }}
      >
        <div className="flex items-center justify-between mb-4 p-4">
          <h2 className="text-2xl font-bold text-white">category</h2>
          <div onClick={onClose} className="z-[100]">
            <X color="white" size={'1.5rem'} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 px-4 z-50">
          {/* {data.map((category) => (
            <p className="text-white text-xs font-bold bg-[#FFFFFF60] w-fit py-1 px-2 rounded-full">
              {category.name}
            </p>
          ))} */}
        </div>
      </aside>
    </>
  );
}
