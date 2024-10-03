import { Text } from "@medusajs/ui"

import Norvik from "../../../../../public/norvik-logo.png"
import Image from "next/image"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Desarrollado por
      <a
        href="https://www.norvik.tech"
        target="_blank"
        rel="noreferrer"
        className="relative w-[125px] h-[75px]"
      >
        <Image src={Norvik} alt="Norvik tech" fill className="fill-[#9ca3af]" />
      </a>
    </Text>
  )
}

export default MedusaCTA
