"use client"

import { Image } from "@nextui-org/react"
import clsx from "clsx"
import { useTransform, motion, MotionValue } from "framer-motion"
import { useRef, useState } from "react"
import { ProductPreviewType } from "types/global"

interface Props {
  i: number
  title: string
  handle: string
  range: number[]
  targetScale: number
  progress: MotionValue<number>
  products: ProductPreviewType[]
}

export const CarouselCard = ({
  i,
  title,
  handle,
  products,
  range,
  progress,
  targetScale,
}: Props) => {
  const container = useRef(null)

  const [productInformation, setProductInformation] = useState()

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <aside
      ref={container}
      className="h-screen w-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          background: "#CCC8C0",
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col-reverse lg:flex-row justify-between relative w-full h-full origin-top pt-40 content-container"
      >
        <div className="w-1/2 flex flex-col gap-y-10 h-full text-start">
          <p className="text-6xl text-white uppercase font-editorial italic">
            New
          </p>
          <div className="w-full flex gap-1">
            {products.slice(0, 2).map((product, index) => {
              return (
                <div
                  key={product.id}
                  className={clsx(
                    "relative h-[400px] w-[300px] bg-white px-2 py-4",
                    {
                      "!scale-75 !translate-y-[50px]": index === 1,
                    }
                  )}
                >
                  <Image
                    src={product?.thumbnail!}
                    className="object-cover rounded-none max-h-96"
                    alt={`Imagen del producto ${product.title}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-1/2 flex flex-col h-full text-end relative">
          <p className="uppercase text-white text-7xl font-light">{title}</p>
          <p className="uppercase text-white text-8xl tracking-tighter relative z-10 ">
            coleccion
          </p>
          {/* Shadow effect text */}
          <p className="absolute text-black text-8xl tracking-tighter top-20 right-0 -translate-x-1 -translate-y-1">
            coleccion
          </p>
          <p className="mt-12 text-start">
            La marca fue creada originalmente para celebrar la moda femenina. A
            partir de 2019, nuestras colecciones de vestidos se lanzaron en
            todas sus dimensiones: desde los estilos más urbanos hasta la
            elegancia casual. Nuestra misión es empoderar a las mujeres a través
            de la moda que las hace sentir seguras y hermosas en todos los
            aspectos de sus vidas.
          </p>
        </div>
      </motion.div>
    </aside>
  )
}
