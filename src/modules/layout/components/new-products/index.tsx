"use client"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { ProductCollectionWithPreviews, ProductPreviewType } from "types/global"

interface Props {
  collections: ProductCollectionWithPreviews[]
}

const NewProducts = ({ collections }: Props) => {
  const [recentProcucts, setRecentProcucts] = useState<ProductPreviewType[]>([])
  useEffect(() => {
    const newArray = collections.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    setRecentProcucts(newArray[0].products)
  }, [collections])

  return (
    <section className="bg-[#f7f6f5] p-10">
      <div>
        <h4 className="text-center mb-10 font-editorial tracking-wide text-2xl">
          Nuevos productos
        </h4>
        <div className="flex flex-wrap gap-y-5 justify-around">
          {recentProcucts &&
            recentProcucts?.map((item: any, index: number) => {
              if (index <= 2) {
                return (
                  <div
                    key={index}
                    className="relative h-[500px] w-[400px] flex justify-center items-end pb-6"
                  >
                    <Image
                      fill
                      className="rounded-none absolute w-full h-full"
                      src={item.thumbnail}
                      alt={`Imagen de la colección`}
                    />
                    <Button
                      className="bg-transparent hover:bg-white hover:text-black border-2 border-white text-white"
                      radius="none"
                    >
                      Comprar ahora
                    </Button>
                  </div>
                )
              }
            })}
        </div>
      </div>
    </section>
  )
}

export default NewProducts
