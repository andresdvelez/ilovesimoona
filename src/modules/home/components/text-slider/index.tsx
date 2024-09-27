"use client"

import clsx from "clsx"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

import PaperBg from "../../../../../public/paper-bg.png"

export const TextSlider = () => {
  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  const [isFixed, setIsFixed] = useState(true)
  let xPercent = 0
  let direction = -1

  const firstWords = ["Empoderar", "Confianza", "Estilo"]
  const secondWords = ["Elegancia", "Creatividad", "Resiliencia"]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsFixed(scrollY < 1200) // Change position based on scroll position
    }

    // Set up the scroll trigger for GSAP
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

    // Set up the scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
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

  useEffect(() => {
    requestAnimationFrame(animate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={clsx(
        isFixed
          ? "fixed top-[calc(100vh-150px)] md:top-[calc(100vh-200px)] lg:top-[calc(100vh-220px)] xl:top-[calc(100vh-290px)]"
          : "absolute bottom-[calc(100vh-920px)]",
        "overflow-hidden w-full z-10"
      )}
    >
      <Image src={PaperBg} alt="Paper bg" fill className="object-cover" />
      <div ref={slider} className="relative whitespace-nowrap">
        <p
          ref={firstText}
          className="relative m-0 text-white text-[30px] md:text-[60px] lg:text-[80px] xl:text-[90px] font-medium pr-[50px]"
        >
          {firstWords.join(" · ")} ·
        </p>
        <p
          ref={secondText}
          className="absolute left-full top-0 m-0 text-white text-[30px] md:text-[60px] lg:text-[80px] xl:text-[90px] font-medium pr-[50px]"
        >
          {secondWords.join(" · ")} ·
        </p>
      </div>
    </div>
  )
}
