import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageBanner } from "@/components/page-banner";
import { ReportDownloadCards } from "@/components/resources/report-download-cards";
import { getReports } from "@/lib/api/reports";

export const metadata = {
  title: "Installation Guide & Resources - Lavo Floors",
  description:
    "Download installation guides and technical documents for Lavo Floors products.",
};

const INTRO_COPY =
  "At Lavo Floor, we believe beautiful flooring should also be a responsible choice. We are committed to offering stylish, high-quality flooring solutions that enhance your space while supporting a more sustainable future.";

export default async function ResourcesPage() {
  const reports = await getReports();

  return (
    <>
      {/* 横幅贴顶；Navbar 为 fixed + z-50，叠在横幅之上 */}
      <Navbar />
      <main className="pb-16">
        <PageBanner src="/images/resource-banner.jpg" priority />

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Installation Guide
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {INTRO_COPY}
            </p>
          </header>

          <p className="mt-14 text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground md:mt-16">
            Click to download
          </p>

          <div className="mt-8 md:mt-10">
            <ReportDownloadCards reports={reports} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
