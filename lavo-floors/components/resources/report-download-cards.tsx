import { FileText } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import type { Report } from "@/lib/types";

export function ReportDownloadCards({ reports }: { reports: Report[] }) {
  const withFiles = reports.filter((r) => {
    const url = r.report_file?.url;
    return typeof url === "string" && url.length > 0;
  });

  if (withFiles.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        No downloadable guides are available yet. Please check back soon.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {withFiles.map((report) => {
        const href = getStrapiMedia(report.report_file?.url);
        const title = report.report_name?.trim() || "Document";
        return (
          <li key={String(report.id)} className="rounded-lg">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-4 rounded-ld border border-border bg-muted/60 p-5 transition-colors hover:bg-muted"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-foreground"
                aria-hidden
              >
                <FileText className="h-7 w-7" strokeWidth={1.25} />
              </span>
              <span className="text-left text-sm font-bold uppercase tracking-wide text-foreground">
                {title}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
