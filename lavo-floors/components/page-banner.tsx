import Image from "next/image";

type PageBannerProps = {
  src: string;
  alt?: string;
  priority?: boolean;
};

/** 全宽顶图 + 黑色渐变遮罩（上 70% 不透明 → 下透明），Navbar 叠在其上 */
export function PageBanner({ src, alt = "", priority = false }: PageBannerProps) {
  return (
    <section className="relative z-0 h-[30vh] w-full min-h-[140px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#000000]/70 to-[#000000]/0"
        aria-hidden
      />
    </section>
  );
}
