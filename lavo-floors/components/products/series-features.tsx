import type { Series } from "@/lib/products";
import { SeriesIcon } from "./series-icon";

interface SeriesFeaturesProps {
  series: Series;
}

export function SeriesFeatures({ series }: SeriesFeaturesProps) {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Description */}
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-4xl mx-auto text-center mb-12">
          {series.description}
        </p>

        {/* Features Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-20 tracking-wide">
          {series.featuresTitle}
        </h1>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 bg-gray-100 p-8 rounded-lg">
          {series.features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-0 bg-white rounded-[100px] p-4 mb-4">
                <SeriesIcon 
                  icon={feature.icon} 
                  color={feature.color || "currentColor"}
                  className="w-10 h-10"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold mb-4 tracking-wide">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
