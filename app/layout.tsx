import Footer from "@/components/footer";
import Nav from "@/components/nav";
import ThemeContextProvider from "@/context/theme-context";
import { siteUrl } from "@/lib/site";
import { themeScript } from "@/lib/theme-script";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shreyash Arali, Full-stack and AI Engineer",
  description:
    "Full-stack engineer who takes products from an empty repo to production. Three AI products built from scratch to real users.",
  openGraph: { type: "website", siteName: "Shreyash Arali" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeContextProvider>
          <Nav />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
