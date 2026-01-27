import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dante Borgese",
  description: "Product & Growth Manager | Systems, GTM, and Distribution",
  openGraph: {
    images: ["/preview-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
