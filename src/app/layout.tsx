import { Metadata } from "next"
import localFont from "next/font/local"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
const OPEN_GRAPH_IMAGE_URL = `${BASE_URL}/logo_sh.png`

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "I love Simoona - Trendy Styles for Everyone",
  description:
    "Discover the latest fashion trends at I love Simoona. Explore stylish clothing, accessories, and more for all genders and ages.",
  openGraph: {
    title: "I love Simoona",
    description:
      "Shop the latest in fashion, from casual wear to exclusive pieces. Perfect for every style, every day.",
    url: BASE_URL,
    siteName: "I love Simoona",
    images: [
      {
        url: OPEN_GRAPH_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "I love Simoona - Trendy Styles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I love Simoona",
    description:
      "Stay ahead of the fashion game with our latest collection. Shop trendy clothing and accessories.",
    images: [OPEN_GRAPH_IMAGE_URL],
  },
}

const Beckman = localFont({
  src: "./config/fonts/beckman/beckman-regular.otf",
  variable: "--font-beckman",
})

const PPEditorialOld = localFont({
  src: [
    {
      path: "./config/fonts/editorial_old/ppeditorialold-ultralightitalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./config/fonts/editorial_old/ppeditorialold-ultralight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./config/fonts/editorial_old/ppeditorialold-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./config/fonts/editorial_old/ppeditorialold-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./config/fonts/editorial_old/ppeditorialold-ultrabolditalic.otf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-pp_editorial_old",
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main
          className={`relative ${Beckman.variable}  ${PPEditorialOld.variable} bg-white font-beckman`}
        >
          {props.children}
        </main>
      </body>
    </html>
  )
}
