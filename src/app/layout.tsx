import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://peterwest-1.github.io/base62-generator"),
  title: {
    default: "Base62 Generator",
    template: "%s · Base62 Generator",
  },
  description:
    "Generate not-cryptographically-strong Base62 strings in your browser. Choose length, count, and prefixes",
  applicationName: "Base62 Generator",
  keywords: [
    "base62",
    "random id",
    "token generator",
    "slug",
    "web crypto",
    "uuid alternative",
  ],
  authors: [{ name: "Peter West", url: "https://github.com/peterwest-1" }],
  creator: "Peter West",
  publisher: "Peter West",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Base62 Generator",
    description:
      "Generate not-cryptographically-strong Base62 strings in your browser.",
    url: "/",
    siteName: "Base62 Generator",
    images: [
      {
        url: "/og.png", // Add a 1200x630 image in /public
        width: 1200,
        height: 630,
        alt: "Base62 Generator",
      },
    ],
    locale: "en",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "utility",
  referrer: "strict-origin-when-cross-origin",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
