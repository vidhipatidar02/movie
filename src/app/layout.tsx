import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Tn566Qh34_tVjx3cCTO0-4WRFSspOlQ6JjamnAPOHpY"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
