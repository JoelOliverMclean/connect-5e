import { Cinzel } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Toolbar from "@/components/toolbar/Toolbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthProvider from "@/providers/AuthProvider";
config.autoAddCss = false;

const cinzelSerif = Cinzel({
  subsets: ["latin"],
});

export const metadata = {
  title: "Connect5e",
  description: "Bringing your party together easier and better",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cinzelSerif.className} antialiased`}>
        <AuthProvider>
          <div className="flex flex-col h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            <header className="z-20">
              <Toolbar />
            </header>

            <main className="container flex-grow mx-auto overflow-y-auto bg-gray-900">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
