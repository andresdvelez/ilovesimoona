import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Fashion Store - Trendy Styles for Everyone",
  description:
    "Discover the latest fashion trends at Fashion Store. Explore stylish clothing, accessories, and more for all genders and ages.",
  openGraph: {
    title: "Fashion Store",
    description:
      "Shop the latest in fashion, from casual wear to exclusive pieces. Perfect for every style, every day.",
    url: BASE_URL,
    siteName: "Fashion Store",
    images: [
      {
        url: "/logo_sh.png",
        width: 1200,
        height: 630,
        alt: "Fashion Store - Trendy Styles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Store",
    description:
      "Stay ahead of the fashion game with our latest collection. Shop trendy clothing and accessories.",
    images: ["/logo_sh.png"],
  },
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
