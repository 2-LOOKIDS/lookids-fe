import "@repo/ui/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import AuthContextProvider from "../providers/AuthContextProvider";
import { options } from "./api/auth/[...nextauth]/options";

// import { Toaster } from "@repo/ui/components/ui/toaster";

export const metadata: Metadata = {
  title: "Lookids",
  description: "루키즈 공식 홈페이지",
  icons: {
    icon: "/icons/favicon-96x96.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(options);
  const isAuth = session?.user ? true : false;

  return (
    <html lang="ko">
      <body>
        <AuthContextProvider isAuth={isAuth}>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
