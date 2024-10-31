import BottomAppBar from "../../components/ui/BottomAppBar";
import TopNavBar from "../../components/ui/TopNavBar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <TopNavBar />
      </header>
      {children}
      <footer>
        <BottomAppBar />
      </footer>
    </div>
  );
}
