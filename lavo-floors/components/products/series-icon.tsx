"use client";

import { useState, useEffect } from "react";

interface SeriesIconProps {
  icon: string;
  color?: string;
  className?: string;
}

export function SeriesIcon({ icon, color, className = "" }: SeriesIconProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Check if icon is an emoji or SVG file
  const isEmoji = !icon.endsWith(".svg");
  const isSvgFile = icon.endsWith(".svg");

  useEffect(() => {
    if (isSvgFile) {
      // Fetch SVG file
      fetch(`/${icon}`)
        .then((res) => res.text())
        .then((text) => {
          // Apply color to SVG if provided
          if (color && color !== "currentColor") {
            // Replace stroke attributes (but not "none")
            text = text.replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`);
            // Replace fill attributes (but not "none")
            text = text.replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);
            // If SVG has no stroke or fill, add stroke to the first path or the svg element
            if (!text.match(/stroke="[^"]*"/) && !text.match(/fill="[^"]*"/)) {
              // Try to add stroke to the first path element
              text = text.replace(/<path([^>]*)>/, `<path$1 stroke="${color}">`);
              // If no path found, add to svg element
              if (!text.includes(`stroke="${color}"`)) {
                text = text.replace(/<svg([^>]*)>/, `<svg$1 stroke="${color}">`);
              }
            }
          }
          setSvgContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading SVG:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [icon, color, isSvgFile]);

  if (isEmoji) {
    return <span className={className || "text-6xl"}>{icon}</span>;
  }

  if (isLoading) {
    return <div className={className || "w-40 h-40"} />;
  }

  if (svgContent) {
    return (
      <div
        className={`flex items-center justify-center ${className || "w-40 h-40"}`}
        style={color === "currentColor" ? { color: "inherit" } : undefined}
      >
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
    );
  }

  return null;
}
