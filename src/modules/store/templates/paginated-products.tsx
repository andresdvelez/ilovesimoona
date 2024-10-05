import { getProductsListWithSort, getRegion } from "@lib/data"
import PaymentProviders from "@lib/util/get-payment-providers"
import { ProductCollection } from "@medusajs/product"
import { BrandLinkItem } from "@modules/products/components/brand-link-item"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  collection?: ProductCollection
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  productsType = "featuredProducts",
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  productsType?: "brandLink" | "featuredProducts"
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  // Set collection filter if provided
  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  // Set category filter if provided
  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  // Set product IDs filter if provided
  if (productsIds) {
    queryParams["id"] = productsIds
  }

  try {
    const {
      response: { products, count },
    } = await getProductsListWithSort({
      page,
      queryParams,
      sortBy,
      countryCode,
    })

    const totalPages = Math.ceil(count / PRODUCT_LIMIT)

    const filteredProducts =
      productsType !== "brandLink"
        ? products.filter((p) => !p.collection?.metadata?.isBrandLink)
        : products

    return (
      <>
        <ul
          className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
          data-testid="products-list"
        >
          {filteredProducts.map((p) => {
            if (productsType !== "brandLink") {
              return (
                <li key={p.id}>
                  <ProductPreview productPreview={p} region={region} />
                </li>
              )
            } else {
              return (
                <li key={p.id}>
                  <BrandLinkItem productPreview={p} />
                </li>
              )
            }
          })}
        </ul>
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      </>
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return null
  }
}
