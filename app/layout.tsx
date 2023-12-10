import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/globals/Navbar";
import Head from "next/head";
import Providers from "./react-query/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/globals/Footer";
import ReduxProvider from "./utils/reduxProvider";

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
      <body className={`${oswald.className} flex flex-col min-h-screen`}>
        <ReduxProvider>
          <Providers>
            <Navbar />

            {children}
            <Footer />
            <ToastContainer />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
