import { Product, ProductCollection } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import { HomePage } from "@modules/home"
import { FeaturedProducts } from "@modules/home/components/featured-products"
import NewProducts from "@modules/home/components/new-products"
import { BrandLinks } from "@modules/home/components/brand-links"

export const metadata: Metadata = {
  title: "I Love Simoona",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 8)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  const collectionsWithoutBrandLinks = collections.filter(
    (collection) => !collection.metadata?.isBrandLink
  )

  return (
    <>
      <HomePage collections={collectionsWithoutBrandLinks} region={region} />
      <div className="">
        <NewProducts collections={collectionsWithoutBrandLinks} />
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts
            collections={collectionsWithoutBrandLinks}
            region={region}
          />
        </ul>
        <BrandLinks collections={collections} />
      </div>
    </>
  )
}
