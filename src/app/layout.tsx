import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "zshLibrary – Dev Knowledge Base",
  description:
    "Personal knowledge library covering Unreal Engine, Golang, .NET, React, TypeScript and more!",
  openGraph: {
    title: "zshLibrary",
    description:
      "A curated knowledge base for game dev & fullstack development.",
    url: "https://library.zshstacks.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}
