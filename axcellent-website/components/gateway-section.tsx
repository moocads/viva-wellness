import Image from "next/image"
import Link from "next/link"

export default function GatewaySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="mb-2">
              <Image
                src="/images/axcellent-logo-horizontal.png"
                alt="Axcellent Logo"
                width={300}
                height={100}
                className="h-12 w-auto"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              YOUR GATEWAY TO
              <br />
              CANADA'S BEST NETWORK
            </h2>
            <p className="text-gray-700 mb-6">
              For over 20 years, Canadians have trusted us with their communication needs. As a Bell Authorized Dealer,
              we're committed to providing you with the best service possible. With us, you get the best network
              experience—discover the Axcellent difference today!
            </p>
            <Link href="/about" className="bell-button text-center inline-block rounded-[50px] w-[200px]">
              Learn more
            </Link>
          </div>
          <div className="md:w-1/3 md:pl-12">
            <div className="relative">
              <div className="absolute -left-[80px] -top-4 w-60 h-60 rounded-full bg-bellBlue z-20 opacity-80"></div>
              <div className="absolute -right-4 -bottom-4 w-48 h-48 rounded-full bg-[#E9D0DB]"></div>
              <div className="relative rounded-full overflow-hidden">
                <Image
                  src="/images/home-banner-01.png"
                  alt="Woman on phone"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

