import React from "react"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const BrandLinkItem = ({
  productPreview,
}: {
  productPreview: ProductPreviewType
}) => {
  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group rounded-none"
    >
      <div data-testid="product-wrapper" className="">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="small"
          className="!rounded-none !overflow-visible !object-contain"
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {productPreview.title}
          </Text>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
