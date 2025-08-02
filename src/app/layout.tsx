import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pamadorka - Neural Focus Interface",
    template: "%s | Pamadorka"
  },
  description: "A cyberpunk-themed Pomodoro timer for enhanced productivity. Track focus time, take smart breaks, play brain games, and boost your productivity with our futuristic study interface.",
  keywords: [
    "pomodoro timer",
    "productivity app",
    "focus timer",
    "study app",
    "cyberpunk",
    "time management",
    "concentration",
    "work timer",
    "break timer",
    "productivity tracker"
  ],
  authors: [{ name: "T14Xploit" }],
  creator: "Pamadorka",
  publisher: "Pamadorka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pamadorka.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pamadorka - Neural Focus Interface",
    description: "A cyberpunk-themed Pomodoro timer for enhanced productivity. Track focus time, take smart breaks, and boost your productivity.",
    url: 'https://pamadorka.netlify.app',
    siteName: 'Pamadorka',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pamadorka - Neural Focus Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pamadorka - Neural Focus Interface",
    description: "A cyberpunk-themed Pomodoro timer for enhanced productivity. Track focus time, take smart breaks, and boost your productivity.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0891b2" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Pamadorka" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Pamadorka" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
