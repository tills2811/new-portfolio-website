import ThemeContextProvider from "@/context/theme-context";
import { themeScript } from "@/lib/theme-script";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "Shreyash Arali, Full-stack and AI Engineer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeContextProvider>
          {children}
          <Toaster position="top-right" />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
