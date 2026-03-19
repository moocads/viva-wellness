import type { Schema, Struct } from '@strapi/strapi';

export interface ProductProductSpec extends Struct.ComponentSchema {
  collectionName: 'components_product_product_specs';
  info: {
    displayName: 'productSpec';
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
      'product.product-spec': ProductProductSpec;
    }
  }
}
