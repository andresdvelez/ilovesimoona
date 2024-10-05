import { ProductCollection } from "@medusajs/medusa"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import Image from "next/image"
import React, { Suspense } from "react"

export const BrandLinkTemplate = ({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: ProductCollection
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="flex flex-col py-6 content-container">
      <div className="mb-8 text-2xl-semi text-center flex flex-col gap-8">
        <h1>{collection?.title}</h1>
        <div className="relative w-full h-[400px] rounded-md flex items-center justify-center">
          <Image
            src={collection?.metadata?.descriptionImage!}
            fill
            className="object-cover relative backdrop-grayscale"
            alt={collection.title}
          />
          <p className="text-4xl z-10 text-white max-w-lg">
            {collection?.metadata?.description}
          </p>
        </div>
      </div>
      <Suspense fallback={<SkeletonProductGrid />}>
        <div className="mb-8 text-2xl-semi text-center flex flex-col gap-8">
          <h2>{collection?.metadata?.subtitle}</h2>
          {/* <RefinementList sortBy={sortBy || "created_at"} /> */}
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            collectionId={collection?.id}
            countryCode={countryCode}
            productsType="brandLink"
          />
        </div>
      </Suspense>
    </div>
  )
}
