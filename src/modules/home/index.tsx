"use client"

import React, { RefObject, useRef } from "react"
import { ProductCollectionWithPreviews } from "types/global"
import { Region } from "@medusajs/medusa"
import { HomeCarousel } from "./components/carousel"
import { useScroll, useTransform, motion } from "framer-motion"

interface Props {
  collections: ProductCollectionWithPreviews[]
  region: Region
}

export const HomePage = ({ collections, region }: Props) => {
  const mainContainer = useRef(null)

  const { scrollYProgress } = useScroll({
    target: mainContainer,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])

  return (
    <motion.div
      style={{ scale: imageScale }}
      ref={mainContainer}
      className="relative w-screen h-full"
    >
      <HomeCarousel region={region} collections={collections} />
    </motion.div>
  )
}
