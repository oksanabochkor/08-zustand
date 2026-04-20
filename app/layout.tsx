import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

import "@/app/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple app to create, manage and organize your notes",
  openGraph: {
    title: "NoteHub",
    description: "A simple app to create, manage and organize your notes",
    url: "https://your-site-url.com",
    images: [
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    ],
  },
};

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />

          <main>
            {children}
            {modal}
          </main>

          <Footer />
        </TanStackProvider>

        <div id="modal-root" />
      </body>
    </html>
  );
}

