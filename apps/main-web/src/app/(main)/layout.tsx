import BottomAppBar from "../../components/layouts/BottomAppBar";
import { ReactNode } from "react";
import TopNavBar from "../../components/layouts/TopNavBar";

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
