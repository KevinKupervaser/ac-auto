import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Notification from "./components/Notification";
import AuthSession from "./components/AuthSession";
import { AppWrapper } from "./context";
import Navbar from "./components/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSession>
      <html lang="es">
        <body className={roboto.className}>
          <AppWrapper>
            <Navbar />
            {children}
            <Notification />
          </AppWrapper>
        </body>
      </html>
    </AuthSession>
  );
}
