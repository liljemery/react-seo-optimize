import { ComponentType } from 'react';

export interface SEOptimizeProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  ogSiteName?: string;
  ogLocale?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  schema?: object;
  robots?: string;
  author?: string;
  [key: string]: any;
}

export declare const SEOptimize: ComponentType<SEOptimizeProps>;

export interface OrganizationSchemaConfig {
  name: string;
  alternateName?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: object;
  contactPoint?: object;
  sameAs?: string[];
  areaServed?: object;
  hasOfferCatalog?: object;
}

export interface ProfessionalServiceSchemaConfig {
  name?: string;
  description?: string;
  url?: string;
  areaServed?: object;
  serviceType?: string;
  provider?: object;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface WebPageSchemaConfig {
  name?: string;
  description?: string;
  url?: string;
  inLanguage?: string;
  isPartOf?: object;
}

export declare function generateOrganizationSchema(
  config: OrganizationSchemaConfig
): object;

export declare function generateProfessionalServiceSchema(
  config: ProfessionalServiceSchemaConfig
): object;

export declare function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): object;

export declare function generateWebPageSchema(
  config: WebPageSchemaConfig
): object;
