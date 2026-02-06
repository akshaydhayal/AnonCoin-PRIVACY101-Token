import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SolanaWalletProvider } from "@/components/WalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRIVACY101 | Educational Airdrop",
  description: "Learn privacy on Solana and earn rewards. Powered by Anoncoin.",
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-purple-500/30`}
      >
        <SolanaWalletProvider>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0A0A0A',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-geist-mono)',
              },
            }}
          />
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
