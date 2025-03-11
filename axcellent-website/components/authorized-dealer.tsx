import Image from "next/image"

export default function AuthorizedDealer() {
  return (
    <section className="relative py-20 bg-white bt border-b-[1px] ">
      <div className="absolute bottom-0"><svg xmlns="http://www.w3.org/2000/svg" width="257" height="253" viewBox="0 0 257 253" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M222.562 253H257C250.982 113.76 136.636 2.08961 -4 0V34.546C118.471 34.546 218.505 131.87 222.562 253ZM198.345 253H163.411C159.411 164.383 85.8586 93.5156 -4 93.5156V58.6214C105.14 58.6214 194.345 145.149 198.345 252.989V253ZM13.1626 129.589C81.4186 129.589 136.952 184.953 136.952 253H102.615C102.615 237.317 98.491 222.6 91.3353 209.781L30.3365 252.876V252.989H-4V129.578H13.1626V129.589ZM69.2369 183.661C58.1257 174.707 44.8734 168.303 30.3252 165.472V211.152L69.2369 183.661Z" fill="#F6F5F8"/>
</svg></div>
      <div className="container mx-auto px-4 text-center ">
        <div className="inline-block bg-bellBlue text-white text-2xl px-6 py-1 rounded-[10px] border-[5px] mb-6">AUTHORIZED DEALER</div>

        <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-sm md:text-base">
          Axcellent Communications Inc. is a Bell Authorized Dealer that sells premium Bell, Virgin Plus, Lucky Mobile
          products and services for consumers and businesses in Ontario.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-4">
          <Image
            src="images/bell.png"
            alt="Bell Logo"
            width={120}
            height={60}
            className="h-16 w-auto"
          />
          <Image
            src="images/virgin.png"
            alt="Virgin Plus Logo"
            width={120}
            height={60}
            className="h-16 w-auto"
          />
          <Image
            src="images/lucky.png"
            alt="Lucky Mobile Logo"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
        </div>
      </div>

    </section>
  )
}

