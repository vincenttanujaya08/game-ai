import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-nusa",
  display: "swap",
});

export const metadata = {
  title: "AI Game · NUSA Lab",
  description:
    "Simulasi literasi AI untuk memilih sumber, memakai AI, dan memeriksa hasil.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
