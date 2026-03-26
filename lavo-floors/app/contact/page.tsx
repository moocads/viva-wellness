import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageBanner } from "@/components/page-banner";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = {
  title: "Contact Us - Lavo Floors",
  description: "Get in touch with Lavo Floors for product questions, quotes, and support.",
};

/** 与页脚 / Strapi 一致的展示地址，用于地图定位 */
const OFFICE_ADDRESS =
  "Unit #123 - 7080 River Road Richmond, BC V7C 3T2";

export default function ContactPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapSrc =
    apiKey &&
    `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      apiKey
    )}&q=${encodeURIComponent(OFFICE_ADDRESS)}`;

  return (
    <>
      {/* 横幅贴顶；Navbar 为 fixed + z-50，叠在横幅之上 */}
      <Navbar />
      <main className="pb-16">
        <PageBanner src="/images/contact-banner.jpg" priority />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Google Map（Embed API） */}
            <div className="h-[min(70vh,560px)] min-h-[320px] w-full overflow-hidden rounded-sm border border-border bg-muted">
              {mapSrc ? (
                <iframe
                  title="Lavo Floors office location"
                  src={mapSrc}
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-sm text-muted-foreground">
                  <p>Map preview unavailable.</p>
                  <p className="max-w-xs">
                    Set{" "}
                    <code className="rounded bg-secondary px-1 py-0.5 text-xs">
                      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                    </code>{" "}
                    in your environment.
                  </p>
                </div>
              )}
            </div>

            <div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Contact Us
              </h1>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
