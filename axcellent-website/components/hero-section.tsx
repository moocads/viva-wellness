"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 0,
      image: "images/home-banner-iphone16.png",
      title: "iPhone 16",
      description: "Get it on Canada's fastest and most reliable 5G+ network",
    },
    {
      id: 1,
      image: "images/home-banner-iphone16.png",
      title: "iPhone 16",
      description: "Get it on Canada's fastest and most reliable 5G+ network",
    },
    {
      id: 2,
      image: "images/home-banner-iphone16.png",
      title: "iPhone 16",
      description: "Get it on Canada's fastest and most reliable 5G+ network",
    },
  ]

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      {/* Background pattern */}

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <Image
                    src={slide.image}
                    alt="iPhone 14 lineup"
                    width={500}
                    height={500}
                    className="max-w-full h-auto"
                    priority
                  />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="text-bellBlue text-lg font-medium mb-2">{slide.title}</div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#10306C] mb-4">
                    {slide.description}
                  </h1>
                  <Link href="/promotions" className="bell-button inline-block mt-2 rounded-[50px]">
                    Limited Time Offer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-bellBlue" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
             <div className="absolute bottom-0 right-0"><svg xmlns="http://www.w3.org/2000/svg" width="522" height="507" viewBox="0 0 522 507" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M68.8758 507H0C12.0352 227.97 240.727 4.18748 522 0V69.2285C277.058 69.2285 76.9894 264.261 68.8758 507ZM117.31 507H187.177C195.178 329.415 342.283 187.401 522 187.401V117.475C303.721 117.475 125.311 290.872 117.31 506.978V507ZM487.675 259.691C351.163 259.691 240.096 370.637 240.096 507H308.769C308.769 475.571 317.018 446.079 331.329 420.391L453.327 506.752V506.978H522V259.669H487.675V259.691ZM375.526 368.048C397.749 350.105 424.253 337.272 453.35 331.599V423.138L375.526 368.048Z" fill="white"/>
</svg></div>
    </section>
  )
}

