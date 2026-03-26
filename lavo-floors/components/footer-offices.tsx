import type { ContactLocation } from "@/lib/types";

function cityLabel(loc: ContactLocation): string {
  return (loc.City ?? loc.city ?? "").trim();
}

function telHref(phone: string): string {
  const t = phone.trim();
  if (!t) return "#";
  // 保留 + 与数字，去掉空格、括号、横线等
  const compact = t.replace(/[^\d+]/g, "");
  return compact ? `tel:${compact}` : `tel:${encodeURIComponent(t)}`;
}

type Props = {
  locations: ContactLocation[];
};

export function FooterOffices({ locations }: Props) {
  if (locations.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Office locations will appear here once configured in the CMS.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {locations.map((loc) => {
        const city = cityLabel(loc);
        const title = city ? `${city} Office` : "Office";
        const mapUrl = (loc.google_map_link ?? "").trim();
        const address = (loc.address ?? "").trim();
        const phone = (loc.phone ?? "").trim();
        const email = (loc.email ?? "").trim();

        return (
          <div key={String(loc.id)}>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              {title}
            </h3>
            <div className="space-y-1 text-sm text-gray-400">
              {phone ? (
                <p>
                  <a
                    href={telHref(phone)}
                    className="hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </p>
              ) : null}
              {email ? (
                <p>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </p>
              ) : null}
              {address ? (
                <p>
                  {mapUrl ? (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors underline-offset-2 hover:underline"
                    >
                      {address}
                    </a>
                  ) : (
                    address
                  )}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
