export type StrapiImage = {
  id: number | string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<
    string,
    {
      url: string;
    }
  >;
};

export type StrapiFile = {
  id: number | string;
  url: string;
  name?: string;
  size?: number;
  mime?: string;
};

export type ProductSpec = {
  id: number | string;
  label: string;
  value: string;
};

export type Collection = {
  id: number | string;
  documentId?: string;
  collection_name: string;
  slug: string;
  cover_image?: StrapiImage | null;
  /** Strapi 富文本/长文案，可选 */
  description?: string | null;
};

export type Series = {
  id: number | string;
  documentId?: string;
  seriesName: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  cover_image?: StrapiImage | null;
  collection?: Collection | null;
  /**
   * Strapi 里常见「Series → product」单向关联（populate=* 时为单个对象）。
   * 若没在 Product 上填反向 series，仅靠 /api/products 过滤会漏掉这条。
   */
  product?: Product | null;
};

export type Product = {
  id: number | string;
  documentId?: string;
  product_name: string;
  slug?: string; // Some Strapi setups have slug; your sample doesn't show it, so it's optional.
  product_image?: StrapiImage | null;
  rendering_image?: StrapiImage | null;
  available_location?: string;
  /** CMS 字段拼写（与 available_location 二选一） */
  avaliable_location?: string;
  Documents?: StrapiFile[]; // array in your sample
  specs?: ProductSpec[];
  series?: Series | null;
};

export type StrapiListResponse<T> = {
  data: T[];
  meta: {
    pagination?: unknown;
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: Record<string, unknown>;
};

/** Strapi single type `contact-info` → locations 组件 */
export type ContactLocation = {
  id: number | string;
  /** CMS 字段名可能是 City（首字母大写） */
  City?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  google_map_link?: string;
};

export type ContactInfoPayload = {
  id?: number | string;
  locations?: ContactLocation[];
};

/** Strapi collection `report`：安装/资源 PDF */
export type Report = {
  id: number | string;
  documentId?: string;
  report_name: string;
  report_file?: StrapiFile | null;
};

