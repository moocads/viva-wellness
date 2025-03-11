"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Email submitted:", email)
    setEmail("")
    // Show success message or handle API call
  }

  return (
    <section className="relative bell-blue text-white h-[200px] my-12 ">
      <div className="container mx-auto py-4 px-0 text-center">
          <div className="absolute bottom-0 md:block hidden">
            <Image
              src="/images/home-banner-02.png"
              alt="Person with laptop and dog"
              width={300}
              height={300}
              className="max-w-full bottom-0 h-auto"
            />
          </div>
        
            <h2 className="text-2xl md:text-3xl font-bold my-6 ">SIGN UP NOW FOR SPECIAL OFFER!</h2>
            <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please enter your email here."
          className="w-full h-[50px] pl-4 pr-24 rounded-full shadow-sm"
          required
        />
        <button
          type="submit"
          className="absolute right-0 h-[50px] px-6 text-sm font-medium text-[#0066A4] bg-[#ECE7F5] rounded-full"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>

    
      </div>

            <div className="absolute top-0 right-0">
<svg xmlns="http://www.w3.org/2000/svg" width="210" height="200" viewBox="0 0 251 247" fill="none">
<g clip-path="url(#clip0_19_147)">
<path d="M238.232 126.516C171.545 126.516 117.288 180.567 117.288 247H150.835C150.835 231.689 154.865 217.321 161.856 204.806L221.453 246.879V246.989H255V126.505H238.232V126.516ZM183.447 179.305C194.302 170.564 207.25 164.312 221.464 161.548V206.144L183.447 179.305Z" fill="#1B7FBC"/>
<path d="M57.3065 247H91.4372C95.3457 160.484 167.207 91.2979 255 91.2979V57.2312C148.369 57.2312 61.215 141.707 57.3065 246.989V247Z" fill="#1B7FBC"/>
<path d="M0 247H33.6462C37.6098 128.743 135.345 33.7267 255 33.7267V0C117.597 2.04005 5.87928 111.062 0 247Z" fill="#1B7FBC"/>
</g>
<defs>
<clipPath id="clip0_19_147">
<rect width="255" height="247" fill="white"/>
</clipPath>
</defs>
</svg>
      </div>

    </section>
  )
}

