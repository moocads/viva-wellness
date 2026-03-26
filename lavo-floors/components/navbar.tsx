import { getCollections } from "@/lib/api/collections";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const collections = await getCollections();

  return (
    <NavbarClient
      collections={collections.map((c) => ({
        slug: c.slug,
        collection_name: c.collection_name,
      }))}
    />
  );
}

