import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SK'ask",
  description: "It is a AI app created by Saizan Khan",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    afterSignOutUrl="/"
    signInForceRedirectUrl="/auth-sync"
    signUpForceRedirectUrl="/auth-sync"
    appearance={{
      baseTheme: dark,
      variables: {
        colorBackground: '#121212',
        colorText: 'hsl(60 9.1% 97.8%)',
        colorDanger: '#121212',
        colorTextSecondary: 'hsl(24 5.4% 63.9%)',
        colorInputBackground: '#121212',
        colorInputText: 'hsl(60 9.1% 97.8%)',
        borderRadius: '0.35rem',
        colorPrimary: '#52ced6',
        colorTextOnPrimaryBackground: 'hsl(60 9.1% 97.8%)',
      }
    }}>
    <html lang="en">
      <head>
      <link rel="icon" href="/logo copy.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
