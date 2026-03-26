import type { Schema, Struct } from '@strapi/strapi';

export interface LocationLocations extends Struct.ComponentSchema {
  collectionName: 'components_location_locations';
  info: {
    description: '';
    displayName: 'Locations';
  };
  attributes: {
    address: Schema.Attribute.String;
    City: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    google_map_link: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface ProductProductSpec extends Struct.ComponentSchema {
  collectionName: 'components_product_product_specs';
  info: {
    displayName: 'ProductSpec';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'location.locations': LocationLocations;
      'product.product-spec': ProductProductSpec;
    }
  }
}
