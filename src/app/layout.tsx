import "./globals.css";

export const metadata = {
  title: "AI Game · NUSA Lab",
  description:
    "Simulasi literasi AI untuk memilih sumber, memakai AI, dan memeriksa hasil.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
