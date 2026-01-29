export interface Product {
  slug: string;
  name: string;
  sku: string;
  metaLine: string;
  image: string;
  colour: string;
  collection: string;
  size: string;
  thickness: string;
  length: string;
  width: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: "light-pure-oak",
    name: "LIGHT PURE OAK",
    sku: "W1214-05125-3",
    metaLine: "PARQUET - FALSTER - W1214-05125-3",
    image: "https://placehold.co/600x400/e8dcc4/1a1a1a?text=Light+Pure+Oak",
    colour: "Beige",
    collection: "Falster",
    size: "Long and wide plank",
    thickness: "13 mm",
    length: "2200 mm",
    width: "185 mm",
    description: "A timeless light oak floor with a pure, natural finish that brings warmth and elegance to any space."
  },
  {
    slug: "natural-harmony-oak",
    name: "NATURAL HARMONY OAK",
    sku: "W1214-05126-3",
    metaLine: "PARQUET - FALSTER - W1214-05126-3",
    image: "https://placehold.co/600x400/d4c4a8/1a1a1a?text=Natural+Harmony+Oak",
    colour: "Natural",
    collection: "Falster",
    size: "Long plank",
    thickness: "13 mm",
    length: "1820 mm",
    width: "185 mm",
    description: "Embrace the beauty of nature with this harmonious oak floor featuring subtle grain variations."
  },
  {
    slug: "warm-brown-oak",
    name: "WARM BROWN OAK",
    sku: "W1214-05127-3",
    metaLine: "PARQUET - LANGELAND - W1214-05127-3",
    image: "https://placehold.co/600x400/8b7355/ffffff?text=Warm+Brown+Oak",
    colour: "Brown",
    collection: "Langeland",
    size: "Long and wide plank",
    thickness: "13.5 mm",
    length: "2200 mm",
    width: "185 mm",
    description: "Rich warm brown tones create a cozy atmosphere perfect for traditional and modern interiors."
  },
  {
    slug: "dark-espresso-oak",
    name: "DARK ESPRESSO OAK",
    sku: "W1214-05128-3",
    metaLine: "PARQUET - LANGELAND - W1214-05128-3",
    image: "https://placehold.co/600x400/3d2b1f/ffffff?text=Dark+Espresso+Oak",
    colour: "Dark brown",
    collection: "Langeland",
    size: "Long plank",
    thickness: "13.5 mm",
    length: "1820 mm",
    width: "185 mm",
    description: "Deep espresso tones add sophistication and drama to contemporary living spaces."
  },
  {
    slug: "soft-grey-oak",
    name: "SOFT GREY OAK",
    sku: "W1214-05129-3",
    metaLine: "PARQUET - LOFOTEN - W1214-05129-3",
    image: "https://placehold.co/600x400/b8b8b8/1a1a1a?text=Soft+Grey+Oak",
    colour: "Light Grey",
    collection: "Lofoten",
    size: "Pattern plank",
    thickness: "13 mm",
    length: "580 mm",
    width: "145 mm",
    description: "Contemporary grey tones bring a Scandinavian minimalist aesthetic to your home."
  },
  {
    slug: "pure-white-oak",
    name: "PURE WHITE OAK",
    sku: "W1214-05130-3",
    metaLine: "PARQUET - LOFOTEN - W1214-05130-3",
    image: "https://placehold.co/600x400/f5f5f0/1a1a1a?text=Pure+White+Oak",
    colour: "White",
    collection: "Lofoten",
    size: "Long and wide plank",
    thickness: "13 mm",
    length: "2200 mm",
    width: "185 mm",
    description: "Bright and airy, this white oak floor creates an open, luminous feel in any room."
  },
  {
    slug: "classic-beige-oak",
    name: "CLASSIC BEIGE OAK",
    sku: "W1214-05131-3",
    metaLine: "PARQUET - SALTHOLM - W1214-05131-3",
    image: "https://placehold.co/600x400/d9c9a5/1a1a1a?text=Classic+Beige+Oak",
    colour: "Beige",
    collection: "Saltholm",
    size: "Long plank",
    thickness: "13.5 mm",
    length: "1820 mm",
    width: "185 mm",
    description: "Timeless beige oak with elegant grain patterns for sophisticated interiors."
  },
  {
    slug: "rustic-brown-oak",
    name: "RUSTIC BROWN OAK",
    sku: "W1214-05132-3",
    metaLine: "PARQUET - SALTHOLM - W1214-05132-3",
    image: "https://placehold.co/600x400/6b5344/ffffff?text=Rustic+Brown+Oak",
    colour: "Brown",
    collection: "Saltholm",
    size: "Pattern plank",
    thickness: "13 mm",
    length: "580 mm",
    width: "145 mm",
    description: "Authentic rustic character with rich brown tones and natural knots."
  },
  {
    slug: "nordic-natural-oak",
    name: "NORDIC NATURAL OAK",
    sku: "W1214-05133-3",
    metaLine: "PARQUET - SVALBARD - W1214-05133-3",
    image: "https://placehold.co/600x400/c4b896/1a1a1a?text=Nordic+Natural+Oak",
    colour: "Natural",
    collection: "Svalbard",
    size: "Long and wide plank",
    thickness: "13.5 mm",
    length: "2200 mm",
    width: "185 mm",
    description: "Inspired by Nordic landscapes, this natural oak brings organic beauty indoors."
  },
  {
    slug: "midnight-dark-oak",
    name: "MIDNIGHT DARK OAK",
    sku: "W1214-05134-3",
    metaLine: "PARQUET - SVALBARD - W1214-05134-3",
    image: "https://placehold.co/600x400/2d2416/ffffff?text=Midnight+Dark+Oak",
    colour: "Dark brown",
    collection: "Svalbard",
    size: "Long plank",
    thickness: "13.5 mm",
    length: "1820 mm",
    width: "185 mm",
    description: "Deep, luxurious dark oak for dramatic and elegant interiors."
  },
  {
    slug: "silver-grey-oak",
    name: "SILVER GREY OAK",
    sku: "W1214-05135-3",
    metaLine: "PARQUET - FALSTER - W1214-05135-3",
    image: "https://placehold.co/600x400/a8a8a0/1a1a1a?text=Silver+Grey+Oak",
    colour: "Light Grey",
    collection: "Falster",
    size: "Pattern plank",
    thickness: "13 mm",
    length: "580 mm",
    width: "145 mm",
    description: "Modern silver-grey finish for contemporary Scandinavian design."
  },
  {
    slug: "ivory-white-oak",
    name: "IVORY WHITE OAK",
    sku: "W1214-05136-3",
    metaLine: "PARQUET - LANGELAND - W1214-05136-3",
    image: "https://placehold.co/600x400/f0ebe0/1a1a1a?text=Ivory+White+Oak",
    colour: "White",
    collection: "Langeland",
    size: "Long and wide plank",
    thickness: "13 mm",
    length: "2200 mm",
    width: "185 mm",
    description: "Soft ivory white oak creates a serene and spacious atmosphere."
  }
];

export const filterOptions = {
  colours: [
    { value: "Beige", count: 2 },
    { value: "Brown", count: 2 },
    { value: "Dark brown", count: 2 },
    { value: "Light Grey", count: 2 },
    { value: "Natural", count: 2 },
    { value: "White", count: 2 }
  ],
  collections: [
    { value: "Falster", count: 3 },
    { value: "Langeland", count: 3 },
    { value: "Lofoten", count: 2 },
    { value: "Saltholm", count: 2 },
    { value: "Svalbard", count: 2 }
  ],
  sizes: [
    { value: "Long and wide plank", count: 5 },
    { value: "Long plank", count: 4 },
    { value: "Pattern plank", count: 3 }
  ],
  thicknesses: [
    { value: "13 mm", count: 7 },
    { value: "13.5 mm", count: 5 }
  ],
  lengths: [
    { value: "580 mm", count: 3 },
    { value: "1820 mm", count: 4 },
    { value: "2200 mm", count: 5 }
  ],
  widths: [
    { value: "145 mm", count: 3 },
    { value: "185 mm", count: 9 }
  ]
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit: number = 4): Product[] {
  return products.filter(p => p.slug !== currentSlug).slice(0, limit);
}
