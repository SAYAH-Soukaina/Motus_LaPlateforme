import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Motus Web",
  description: "Jeu en ligne Motus avec classement des joueurs pour une compétition stimulante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
