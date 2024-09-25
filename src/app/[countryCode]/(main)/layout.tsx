import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
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

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
