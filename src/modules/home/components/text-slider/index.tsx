"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import React, { useEffect, useRef } from "react"

export const TextSlider = () => {
  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  let xPercent = 0
  let direction = -1

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    })
    requestAnimationFrame(animate)
  }, [])

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0
    } else if (xPercent > 0) {
      xPercent = -100
    }
    gsap.set(firstText.current, { xPercent: xPercent })
    gsap.set(secondText.current, { xPercent: xPercent })
    requestAnimationFrame(animate)
    xPercent += 0.05 * direction
  }

  return (
    <div className="absolute top-[calc(100vh-150px)] md:top-[calc(100vh-200px)] lg:top-[calc(100vh-220px)] xl:top-[calc(100vh-290px)] overflow-hidden w-full">
      <div ref={slider} className="relative whitespace-nowrap">
        <p
          ref={firstText}
          className="relative m-0 text-white text-[46px] md:text-[100px] lg:text-[120px] xl:text-[200px] font-medium pr-[50px]"
        >
          ILoveSimoona -
        </p>
        <p
          ref={secondText}
          className="absolute left-full top-0 m-0 text-white text-[46px] md:text-[100px] lg:text-[120px] xl:text-[200px] font-medium pr-[50px]"
        >
          ILoveSimoona -
        </p>
      </div>
    </div>
  )
}
