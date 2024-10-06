import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import LogoImage from "../../../../../public/logo-horizontal.png"
import NavBar from "@modules/layout/components/nav-bar"
const SideMenuItems = {
  Inicio: "/",
  Productos: "/store",
  // Buscar: "/search",
  Cuenta: "/account",
  Carrito: "/cart",
}
export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group flex flex-col">
      <header className="relative flex flex-col mx-auto duration-200 bg-white w-full py-2">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu items={SideMenuItems} regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full relative">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase relative w-[200px] md:w-[300px] h-[60px]"
              data-testid="nav-store-link"
            >
              <Image
                alt="Ilovesimoona"
                className="object-contain"
                fill
                src={LogoImage}
              />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Buscar
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex items-center justify-center"
                href="/account"
                data-testid="nav-account-link"
              >
                <i
                  className="icon-[ph--user] text-2xl"
                  role="img"
                  aria-hidden="true"
                />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <i
                    className="icon-[cil--cart]"
                    role="img"
                    aria-hidden="true"
                  />{" "}
                  (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
      <NavBar items={SideMenuItems} />
      <ul className="bg-black flex items-center justify-center underline text-white text-[8.5px] md:text-xs py-2 gap-1 md:gap-2">
        <LocalizedClientLink href="/collections/asesoria-de-imagen">
          Asesoria de imagen
        </LocalizedClientLink>
        <LocalizedClientLink href="/collections/club-de-lectura">
          Club de lectura
        </LocalizedClientLink>
        <LocalizedClientLink href="/collections/empoderamient-femenino">
          Empoderamiento femenino
        </LocalizedClientLink>
        <LocalizedClientLink href="/collections/arte">
          Articulos de arte
        </LocalizedClientLink>
      </ul>
    </div>
  )
}
