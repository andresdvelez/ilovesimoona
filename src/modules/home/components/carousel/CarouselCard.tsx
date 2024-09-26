"use client"

import { useTransform, motion, MotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { Button, Card, CardFooter, Image } from "@nextui-org/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface Props {
  i: number
  title: string
  src: string
  handle: string
  range: number[]
  targetScale: number
  progress: MotionValue<number>
}

export const CarouselCard = ({
  i,
  title,
  src,
  handle,
  range,
  progress,
  targetScale,
}: Props) => {
  const container = useRef(null)

  const [productInformation, setProductInformation] = useState()

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-8"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -translate-y-1/4 w-[400px] 2xl:h-[750px] xl:w-[450px] rounded-[25px] p-[50px] origin-top"
      >
        <Card isFooterBlurred radius="lg" className="border-none">
          <Image
            alt="Woman listing to music"
            classNames={{
              wrapper: "w-full",
            }}
            className="object-cover w-full h-full"
            src={src}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-black/80 font-medium text-tiny">{title}</p>
            <Button
              as={LocalizedClientLink}
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
              href={`/products/${handle}`}
            >
              Más información
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
