import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bell-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4 uppercase text-sm">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/mobility" className="hover:underline">
                  Mobility Plans
                </Link>
              </li>
              <li>
                <Link href="/internet" className="hover:underline">
                  Internet Plans
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:underline">
                  Business Plans
                </Link>
              </li>
              <li>
                <Link href="/smart-home" className="hover:underline">
                  Smart Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase text-sm">Office</h3>
            <address className="not-italic text-sm space-y-2">
              <p>1000 Markham Rd E</p>
              <p>Markham, ON, L3R 5H3</p>
              <p className="mt-4">TEL:</p>
              <p>123-456-7890</p>
              <p className="mt-4">EMAIL:</p>
              <p>info@axcellent.ca</p>
            </address>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase text-sm">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:opacity-80">
                <Facebook size={24} />
              </Link>
              <Link href="https://linkedin.com" className="hover:opacity-80">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <Image
            src="/placeholder.svg?height=50&width=150"
            alt="Axcellent Communications Logo"
            width={150}
            height={50}
            className="h-10 w-auto mb-4 md:mb-0"
          />
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Axcellent Communications. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

