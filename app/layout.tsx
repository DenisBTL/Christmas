import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Noël chez Laulau · Une soirée à partager",
  description: "Un peu de magie, beaucoup de gourmandise, et vous. Ouvrez votre invitation et choisissez vos disponibilités pour Noël chez Laulau.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
