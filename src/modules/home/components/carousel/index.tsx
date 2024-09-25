"use client"

import Lenis from "@studio-freight/lenis"
import { useScroll } from "framer-motion"
import React, { useEffect, useRef } from "react"
import { ProductCollectionWithPreviews } from "types/global"
import { CarouselCard } from "./CarouselCard"
import { Region } from "@medusajs/medusa"
import { TextSlider } from "../text-slider"

interface Props {
  collections: ProductCollectionWithPreviews[]
  region: Region
}

export const HomeCarousel = ({ collections, region }: Props) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <section ref={container} className="relative pt-[5vh]">
      <TextSlider />
      {collections.map((collection, i) => {
        const targetScale = 1 - i * 0.05
        return (
          <CarouselCard
            key={`p_${i}`}
            i={i}
            src={collection.products[0].thumbnail as string}
            {...collection.products[0]}
            handle={collection.products[0].handle as string}
            progress={scrollYProgress}
            title={collection.title}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </section>
  )
}
