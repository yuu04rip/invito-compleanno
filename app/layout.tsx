import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invito Compleanno - Birthday Party Invitation",
  description: "You're invited to an amazing birthday celebration! RSVP now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
