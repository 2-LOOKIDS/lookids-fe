import BottomAppBar from "../../components/layouts/BottomAppBar";
import TopNavBar from "../../components/layouts/TopNavBar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <>
      <TopNavBar />
      {children}
      <footer>
        <BottomAppBar />
      </footer>
    </>
  );
}
