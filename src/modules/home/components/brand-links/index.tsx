import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import React from "react"
import { ProductCollectionWithPreviews } from "types/global"

interface Props {
  collections: ProductCollectionWithPreviews[]
}

export const BrandLinks = ({ collections }: Props) => {
  return (
    <section className="bg-[#f7f6f5] p-10">
      <div>
        <h4 className="text-center mb-10 font-editorial tracking-wide text-2xl">
          Enlaces de marca
        </h4>
        <ul className="grid grid-cols-2 gap-5 justify-around">
          {collections
            .filter((collection) => collection?.metadata?.isBrandLink)
            .slice(0, 4)
            .map((collection) => (
              <LocalizedClientLink
                key={collection.id}
                href={`/collections/${collection.handle}`}
              >
                <li className="w-full h-[400px] relative flex items-center justify-center">
                  <Image
                    src={collection?.metadata?.bannerImage as string}
                    alt={collection?.title}
                    className="object-cover grayscale filter"
                    fill
                  />
                  <div className="flex items-end justify-center text-white z-10 text-4xl tracking-wide">
                    {collection.title}
                  </div>
                </li>
              </LocalizedClientLink>
            ))}
        </ul>
      </div>
    </section>
  )
}
