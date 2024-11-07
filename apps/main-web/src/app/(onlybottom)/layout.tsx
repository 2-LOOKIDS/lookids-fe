import BottomAppBar from "../../components/ui/BottomAppBar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <footer>
        <BottomAppBar />
      </footer>
    </div>
  );
}
