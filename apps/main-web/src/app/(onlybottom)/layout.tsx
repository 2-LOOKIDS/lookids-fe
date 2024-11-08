import { ReactNode } from "react";
import BottomAppBar from "../../components/layouts/BottomAppBar";

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
