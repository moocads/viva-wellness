import { fetchStrapi } from "@/lib/strapi";
import type {
  ContactInfoPayload,
  ContactLocation,
  StrapiSingleResponse,
} from "@/lib/types";

export async function getContactLocations(): Promise<ContactLocation[]> {
  try {
    const res = await fetchStrapi<StrapiSingleResponse<ContactInfoPayload>>(
      "/api/contact-info?populate=*"
    );
    const list = res.data?.locations;
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
