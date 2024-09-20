import { ArrowUpRightMini } from "@medusajs/icons"
import { Button, Heading, Text } from "@medusajs/ui"
import Image from "next/image"
import HeroImage from "../../../../../public/1.png"
import Hero2Image from "../../../../../public/2.png"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-full relative lg:border-t-2 lg:border-r-[1px] border-main-black bg-main-sky-blue">
        <Image
          fill
          src={HeroImage}
          alt="Hero image"
          className="object-contain"
        />
        <div className="absolute left-2 bottom-3 lg:-left-5 lg:-bottom-3 z-10 flex flex-col justify-center items-start text-start small:p-32">
          <span className="">
            <Heading
              level="h2"
              className="text-xl lg:text-3xl leading-10 text-ui-fg-base font-bold uppercase font-mono"
            >
              Septiembre
            </Heading>
            <Heading
              level="h3"
              className="text-sm lg:text-xl leading-10 text-ui-fg-subtle font-normal -mt-4 lg:mt-0"
            >
              colección
            </Heading>
          </span>
          <LocalizedClientLink href="/store">
            <div className="flex gap-x-1 items-center group border-2 border-black p-1 lg:p-2 rounded-3xl lg:mt-2">
              <Text className="text-black text-sm lg:text-base">
                Ver productos
              </Text>
              <ArrowUpRightMini
                className="group-hover:rotate-45 ease-in-out duration-150 "
                color="black"
              />
            </div>
          </LocalizedClientLink>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full relative border-t-2 lg:border-l-[1px] border-main-black bg-main-sky-blue">
        <Image
          fill
          src={Hero2Image}
          alt="Hero image"
          className="object-contain"
        />
        <div className="absolute left-2 bottom-3 lg:-left-5 lg:-bottom-3 z-10 flex flex-col justify-center items-start text-start small:p-32">
          <span className="">
            <Heading
              level="h2"
              className="text-xl lg:text-3xl leading-10 text-ui-fg-base font-bold uppercase font-mono"
            >
              Outfit
            </Heading>
            <Heading
              level="h3"
              className="text-sm lg:text-xl leading-10 text-ui-fg-subtle font-normal -mt-4 lg:mt-0"
            >
              2024
            </Heading>
          </span>
          <LocalizedClientLink href="/store">
            <div className="flex gap-x-1 items-center group border-2 border-black p-1 lg:p-2 rounded-3xl lg:mt-2">
              <Text className="text-black text-sm lg:text-base">
                Ver productos
              </Text>
              <ArrowUpRightMini
                className="group-hover:rotate-45 ease-in-out duration-150"
                color="black"
              />
            </div>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
