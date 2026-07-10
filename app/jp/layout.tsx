import type { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface JpLayoutProps {
  children: ReactNode;
}

export default function JpLayout({ children }: JpLayoutProps) {
  return (
    <div
      lang="ja"
      className={`${notoSansJP.variable} flex flex-1 flex-col font-(family-name:--font-noto-jp)`}
    >
      {children}
    </div>
  );
}
