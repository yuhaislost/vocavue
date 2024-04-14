import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vocavue",
  description: "A comphrensive language learning app",
};

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={nunito.className}>
                    <Toaster/>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
