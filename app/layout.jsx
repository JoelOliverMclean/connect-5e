import { Cinzel } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Toolbar from "@/components/toolbar/Toolbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
        <SessionProvider>
          <div className="mx-auto h-screen max-w-lg flex flex-col">
            <Toolbar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
