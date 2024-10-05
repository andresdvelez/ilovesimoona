import React, { Suspense } from "react"
import ProductInfo from "../product-info"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { RelatedBrandLinkProducts } from "@modules/products/components/related-brandlink-products"

type ProductTemplateProps = {
  product: PricedProduct
  countryCode: string
}

export const BrandLinkProduct: React.FC<ProductTemplateProps> = ({
  product,
  countryCode,
}) => {
  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedBrandLinkProducts
            product={product}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </>
  )
}
