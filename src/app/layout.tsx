import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed RAOUANE",
  description: "Portfolio of Ahmed RAOUANE - Full-Stack Developer specializing in modern web technologies, showcasing projects, skills, and expertise.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
