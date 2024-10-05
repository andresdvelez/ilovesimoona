"use client"

import { Button } from "@nextui-org/react"
import ImageNext from "next/image"
import { useTransform, motion, MotionValue } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ProductPreviewType } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface Props {
  i: number
  title: string
  handle: string
  range: number[]
  targetScale: number
  progress: MotionValue<number>
  products: ProductPreviewType[]
  bannerImage: string
}

export const CarouselCard = ({
  i,
  title,
  handle,
  products,
  range,
  progress,
  targetScale,
  bannerImage,
}: Props) => {
  const container = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const scale = useTransform(progress, range, [1, targetScale])

  // Function to check if the bannerImage is a video format
  const isVideo = (src: string) => {
    return (
      src?.endsWith(".mp4") || src?.endsWith(".webm") || src?.endsWith(".ogg")
    )
  }

  // Handle video play/pause based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoPlaying(true)
            videoRef.current?.play()
          } else {
            setIsVideoPlaying(false)
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.5 } // Play video when at least 50% of it is visible
    )

    if (container.current) {
      observer.observe(container.current)
    }

    return () => {
      if (container.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(container.current)
      }
    }
  }, [])

  return (
    <aside
      ref={container}
      className="h-screen w-screen flex items-center justify-center sticky top-0 overflow-hidden"
    >
      {isVideo(bannerImage) ? (
        <video
          ref={videoRef}
          src={bannerImage}
          loop
          muted
          playsInline
          className="object-cover w-full h-full absolute top-0 left-0 grayscale filter"
        />
      ) : (
        <ImageNext
          fill
          src={bannerImage}
          alt="banner Image"
          className="object-cover grayscale filter"
        />
      )}

      <motion.div
        style={{
          scale,
        }}
        className="flex h-full lg:flex-row relative w-full origin-top items-center justify-center lg:justify-end content-container"
      >
        <div className="w-full lg:w-1/2 flex flex-col h-full items-center lg:items-end text-end relative justify-center gap-2">
          <p className="uppercase text-white text-5xl md:text-7xl font-light">
            {title}
          </p>
          <p className="uppercase text-white text-2xl md:text-3xl relative z-10 font-editorial italic tracking-wide">
            coleccion
          </p>
          <Button
            as={LocalizedClientLink}
            href={`/collections/${handle}`}
            className="bg-black text-white w-max rounded-sm"
          >
            Comprar ahora
          </Button>
        </div>
      </motion.div>
    </aside>
  )
}
