import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import clsx from "clsx"

const NavBar = ({ items }: { items: Object }) => {
  return (
    <div className="w-full flex justify-center bg-white">
      <ul className="md:flex hidden w-full items-start justify-center gap-x-16">
        {Object.entries(items).map(([name, href]) => {
          return (
            <li
              key={name}
              className={clsx("", {
                "!hidden": name === "Cuenta",
              })}
            >
              <LocalizedClientLink
                href={href}
                className="text-xl border-b-2 border-transparent leading-10 hover:text-ui-fg-disabled relative after:origin-left after:w-0 after:h-2 after:absolute after:-bottom-[0.80rem] after:left-0 hover:after:w-full after:bg-black after:transition-all"
                data-testid={`${name.toLowerCase()}-link`}
              >
                {name}
              </LocalizedClientLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavBar
