import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ROUTES } from "@/lib/constants";
import { ShowBaseOnPathname } from "@/components/misc/show";
import AuthProvider from "@/providers/auth-provider";

const uncutSans = localFont({
  src: "./fonts/UncutSans.woff2",
  variable: "--font-uncut-sans",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Dense0",
  description:
    "Dense0 is an open-source blogging platform that empowers writers and developers to create, share, and manage content seamlessly."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${uncutSans.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            <ShowBaseOnPathname exclude={[ROUTES.join]}>
              <Header />
            </ShowBaseOnPathname>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
