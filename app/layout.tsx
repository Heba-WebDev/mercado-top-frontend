import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/globals/Navbar";
import Head from "next/head";

const oswald = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Mercado Top",
  description: "Don't throw it, sell it!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <body className={`${oswald.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}